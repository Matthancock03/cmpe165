var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');

//When you add a model, require it, then return it when the model name matches the actual model name
//Make sure to put the same model name in MyApp or it won't work!
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');
var Application = require(__dirname + '/models/application');
var Contract = require(__dirname + '/models/Contract');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/bower_components'));
/**
 *  Initializes stormpath middleware. To run locally you will need to export the the api key and secret.
 */
app.use(stormpath.init(app, {
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW'
  },
  website: true,
  web:{
    register: {
      autoLogin: true,
      nextUri: '/stripeSetup'
    }
  }
}));


/**
 *  Used to parse incoming url and determine appropriate model.
 *  Would be nice to just pull from model directory or an array in the future.
 */
var retrieveModel = function(modelName, body)
{
  if(modelName == "Job") {
    return Job
  }
  else if(modelName == "User") {
    return User
  }
  else if(modelName == "Comment") {
    return Comment
  }
  else if(modelName == "Application") {
    return Application
  }
  else if(modelName == "Contract") {
    return Contract
  }
  else//invalid db request.
  {
    return null;
  }

}


/**
 *   Routes
 */
app.get("/", function(req,res){
  res.status(200).sendFile(__dirname + '/views/login.html');
});

app.get("/home", function(req,res){
  res.status(200).sendFile(__dirname + '/views/home.html');
});

app.get("/profile", stormpath.loginRequired, function(req,res){
  //console.log("Current user email is: " + req.user.email);
  res.status(200).sendFile(__dirname + '/views/userProfile.html');
});

app.get("/jobs", function(req,res){
  res.status(200).sendFile(__dirname + '/views/joblist.html');
})

app.get("/jobDisplay", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobDisplayNew.html');
})

app.get("/create",stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})


app.post("/api/:_model", function(req,res){//Really want to include login req here, but need to handle User creation without being logged in.
  console.log('Post Received.');
  //console.log(req);
  console.log(req.body);
  console.log(req.params._model);
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request: No Model"});
    return;
  }
  if(req.body.ownerId == null && req.user != null)//needed to resolve an issue with register
    req.body.ownerId = req.user.email;
  var job = new ret_model(req.body);
  console.log(job);
  job.save(function(err, job){
    if(err){
      console.log(err);
      console.log(job);
      console.log("Job did not save correctly.");
    };
    res.json(201, job);
  })
});
app.put("/api/:_model/:_id",stormpath.loginRequired, function(req,res){
  console.log("In Put!")
  var ret_model = retrieveModel(req.params._model);
  console.log(req.user.email);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }
  ret_model.update(writePermissions({_id : req.params._id},req.user.email), req.body, function(err, numAffected){
    if(err){console.log(err)}
    console.log("In Put callback!")
  });

});
/**
 * adds elements to the object used by a query to establish view permissions.
 * @param objOfQuery
 * @param ownerId
 */
var viewPermissions = function(objOfQuery, ownerId)
{
  objOfQuery.$or = [{viewableIds: {$exists: false}}, {ownerId: ownerId}, {viewableIds: ownerId}];
  return objOfQuery
}
/**
 * adds elements to the object used by a query to establish write permissions.
 * @param objOfQuery
 * @param ownerId
 */
var writePermissions = function(objOfQuery, ownerId)
{
  objOfQuery.ownerId = ownerId;
  return objOfQuery;
}
var stripe = require("stripe")(
    "sk_test_1q9nLen2GaP2Q6Z2o5jpzM97"
);



app.delete("/api/:_model/:_id",stormpath.loginRequired, function(req,res){

  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(500, { error : "Invalid Request"});
    return;
  }

  ret_model.remove(writePermissions({_id : req.params._id},req.user.email),function(err){
    if(err){console.log(err)};
  })
  });

app.get("/api/:_model", function(req,res){
  console.log("Email: " + req.query);
  console.log(req.params._model);
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }

  ret_model.find(viewPermissions(req.query, req.user.email), function(err, element){

    if(err){
      console.log(err);
      };
    console.log(element);
    res.json(element);
  });
});
app.post("/payments", stormpath.loginRequired, function(req, res) {

  var stripeToken = req.body.id;
  var applicationId = req.body.appId;
  var a
  var b
  Application.findOne({_id : applicationId}, function (err1, application) {
    User.findOne({ownerId: application.ownerId}, function (err2, user) {
      Job.findOne({_id: application.jobId}, function (err3, job) {
        if(job.ownerId != req.user.email)
          return;//
        stripe.charges.create({
          amount: job.wages / 2 * 100,
          currency: "usd",
          source: stripeToken, // obtained with Stripe.js

          description: job.description
        }, {stripe_account: user.customerId}, function (err, charge) {
          // asynchronously called
          job.paymentnumber++;
        });
      });
    });// To
  });
});
var TOKEN_URI = 'https://connect.stripe.com/oauth/token';
var AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';

var qs = require('querystring');
var request = require('request');

//From stripe's examples of how to set this up
app.get('/authorize', stormpath.loginRequired, function(req, res) {
  // Redirect to Stripe /oauth/authorize endpoint
  res.redirect(AUTHORIZE_URI + '?' + qs.stringify({
        response_type: 'code',
        scope: 'read_write',
        client_id: 'ca_7ELzHCsxpLq49g5HbpDtxFHCi3jJGfFk'
      }));
});

app.get('/oauth/callback', stormpath.loginRequired, function(req, res) {

  var code = req.query.code;

  // Make /oauth/token endpoint POST request
  request.post({
    url: TOKEN_URI,
    form: {
      grant_type: 'authorization_code',
      client_id: 'ca_7ELzHCsxpLq49g5HbpDtxFHCi3jJGfFk',
      code: code,
      client_secret: 'pk_test_8DDyr5McQXrTdEa4mviz3Fq6'
    }
  }, function(err, r, body) {

    var obj = JSON.parse(body)

    // Do something with your accessToken
    User.findOne({email: req.user.email}, function(err, user){
      user.customerId = obj.stripe_user_id;
      user.save();
    })
    // For demo's sake, output in response:
    res.send({ 'Your Token': accessToken });

  });
});
app.get("/api/:_model/:_id", function(req,res){
  console.log("Id: " + req.params._id);
  console.log("Email: " + req.params.email);

  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }
  ret_model.findOne(viewPermissions({_id : req.params._id},req.user.email), function(err, element){
    if(err){console.log(err)};
    console.log(element);
    res.json(element);
  });
});


app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
