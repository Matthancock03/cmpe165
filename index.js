var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');

//When you add a model, require it, then return it when the model name matches the actual model name
//Make sure to put the same model name in MyApp or it won't work!


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
app.set('view engine', 'jade');
/**
 *  Initializes stormpath middleware. To run locally you will need to export the the api key and secret.
 */

app.use(stormpath.init(app, {
  client: {
    apiKey:{
      id: '1EYOLOT5PJNUA9B6FZ9G2Z7FE',//Needs to be removed before deployment
      secret: "8n9nK0dy58U22PKUZFPrliUPtyN6nm2g4HaUPv27J/M" //Needs to be removed before deployment
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW',
  },
  web: {
    register: {
      enabled: true,
      view: __dirname + '/views/jade/log.jade',
      nextUri: '/home',  // don't send them here
    },
    login: {
      view: __dirname + '/views/jade/log.jade', //path.join(__dirname,'views','login.ejs') // Route used in documentation
      nextUri: '/home',
    }
  },
  baseUrl: "/",
  website: true,
  api: true
}));

//When you add a model, require it here as the name of model; make it a property of dbmodels.
//Make sure to put the same model name in MyApp including capitalization. or it won't work!

var dbmodels = {};
dbmodels.Job = require(__dirname +'/models/job');
dbmodels.Comment = require(__dirname + '/models/comment');
dbmodels.User = require(__dirname + '/models/user');
dbmodels.Application = require(__dirname + '/models/application');
dbmodels.Contract = require(__dirname + '/models/Contract');
dbmodels.Mail = require(__dirname + '/models/mail');
var retrieveModel = function(modelName, body)
{
  for(property in dbmodels){//for each model
    if(modelName == property)//if model's name from parameter is the same as the name of the model
      return dbmodels[property];//return the model
  }
  return null // model not found
}


/**
 *   Routes
 */
app.get("/", function(req,res){
  res.status(200).sendFile(__dirname + '/views/login.html');
});

app.get("/currentUser", function(req,res){
  if(req.user == undefined){
    res.status(200).send({loggedIn: false});
  }else{
    res.status(200).send(req.user);
  }
  });


app.get("/home", function(req,res){
  res.status(200).sendFile(__dirname + '/views/home.html');
});

app.get("/profile", stormpath.loginRequired, function(req,res){
  //console.log("Current user email is: " + req.user.email);
  res.status(200).sendFile(__dirname + '/views/userProfile.html');
});
app.get("/update", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/updateProfile.html');
});
app.get("/jobs", function(req,res){
  res.status(200).sendFile(__dirname + '/views/joblist.html');
})

app.get("/jobDisplay",stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobDisplayNew.html');
})

app.get("/create", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})
app.get("/", function(req,res){
  if(req.user != undefined){
    res.status(200).sendFile(__dirname + '/views/home.html');
  }else{
    res.status(200).sendFile(__dirname + '/views/login.html');
  }
});

app.get("/inbox", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/inbox.html');
})
app.get("/apphistory", function(req,res){
  res.status(200).sendFile(__dirname + '/views/applicationHistory.html');
})
app.get("/stripePaymentSetup", function(req,res){
  res.status(200).sendFile(__dirname + '/views/stripePaymentUI.html');
})
app.get("/contract", function(req,res){
  res.status(200).sendFile(__dirname + '/views/templates/modalTerms&Agreement.html');
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
  objOfQuery.$or = [{modifiable: {$exists: false}}, {modifiable : true}];
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
  job = new ret_model(req.body);
  console.log(req.query)
  for(property in req.query){//for each property of the query
    if(req.query[property].charAt(0) == '{') {//primary issue. no need for syntax errors otherwise
     try {

        temp = JSON.parse(req.query[property]);//set it to an object version of the string passed.
        req.query[property] = temp;
      }
      catch (e) {//this property not an object
        console.log(e);
      }
    }
  }
  ret_model.find(viewPermissions(req.query, req.user.email), function(err, element){

    if(err){
      console.log(err);
      };
    console.log(element);
    res.json(element);
  });
});
app.post("/paymentSetup", stormpath.loginRequired, function(req, res) {
  dbmodels.User.findOne({ownerId: req.user.email}, function (err2, user) {
    stripe.customers.create({
      description: 'Customer for test@example.com',
      source: req.id // obtained with Stripe.js
    },function(err, customer)
    {
      user.customerId = customer.id;
      console.log(user.customerId)
      user.save();
    })
  })
})
app.post("/payments", stormpath.loginRequired, function(req, res) {


  dbmodels.Application.findOne({_id : req.query.applicationId}, function (err1, application) {
    dbmodels.User.findOne({email: application.ownerId}, function (err2, user) {
      if(user.sellerId == null)//???
        return res.redirect("/jobs");
      dbmodels.User.findOne({email: req.user.email}, function (err2, user2) {
        if(user2.customerId == null)
          return res.redirect("/stripePaymentSetup");
        dbmodels.Job.findOne({_id: application.jobId}, function (err3, job) {//May want to consider an async library of sorts. 3 of these calls could be made at the same time instead of waiting for the db to do its thing. slow.
          if(job.paymentNumber == null)
            job.paymentNumber = 0;
          if(job.paymentNumber < 2)//only allowing 1 participant? what's the plan?
            stripe.charges.create({//could handle on the application model, but application's editable by the user. bad idea.
              amount: job.wages / 2 * 100,//hm. an array of booleans? maybe define signatureIds?
              currency: "usd",
              customer: user.customerId,
              description: job.description
            }, {stripe_account: user.sellerId}, function (err, charge) {
              // asynchronously called

            });
          job.paymentNumber++;
          job.save();
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
      client_secret: 'sk_test_1q9nLen2GaP2Q6Z2o5jpzM97'
    }
  }, function(err, r, body) {

    var obj = JSON.parse(body)
    console.log(req.user.email);
    console.log(body);
    //console.log(body);
    // Do something with your accessToken
    dbmodels.User.findOne({email: req.user.email}, function(err, user){
      console.log(user);
      user.sellerId = obj.stripe_user_id;
      user.save();
    })
    res.redirect("/stripePaymentSetup?newUrl=home");
    // For demo's sake, output in response:
    //Instead, let's load a page where the user inputs their credit card info.
    //alternatively, instead of redirecting here, we can just block off creating jobs if you have no credit card info
    // and block off applying for jobs if they have no stripe account.
    //or, we could just mandate the stripe account and require credit card info once when they make their first payment

  });
});

app.get("/api/:_model/:_id", function(req,res){
  console.log("Id: " + req.params._id);

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
