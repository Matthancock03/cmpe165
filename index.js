var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');

//When you add a model, require it, then return it when the model name matches the actual model name
//Make sure to put the same model name in MyApp or it won't work!
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');

var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));
app.use(express.static(__dirname + '/views'));

/**
 *  Initializes stormpath middleware. To run locally you will need to export the the api key and secret.
 */
app.use(stormpath.init(app, {
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW'
  },
  website: true
}));


/**
 *  Used to parse incoming url and determine appropriate model.
 */
var retrieveModel = function(modelName, body)
{
  if(modelName == "Job") {
    return Job
  }
  if(modelName == "User") {
    return User
  }
  if(modelName == "Comment") {
    return Comment
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

app.get("/currentUser", function(req,res){
  if(req.user == undefined){
    res.status(200).send({loggedIn: false});
  }
  res.status(200).send(req.user);
  });

app.get("/home", function(req,res){
  res.status(200).sendFile(__dirname + '/views/home.html');
});

app.get("/profile", function(req,res){
  //console.log("Current user email is: " + req.user.email);
  res.status(200).sendFile(__dirname + '/views/userProfile.html');
});

app.get("/jobs", function(req,res){
  res.status(200).sendFile(__dirname + '/views/joblist.html');
})

app.get("/update", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/updateProfile.html');
})

app.get("/jobDisplay", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobDisplay.html');
})

app.get("/create",stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})


app.post("/api/:_model",stormpath.loginRequired, function(req,res){
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
 * returns a query that will return all visible elements. execute later in your methods.
 * @param model
 * @param ownerId
 */
var viewPermissions = function(objOfQuery, ownerId)
{
  objOfQuery.$or = [{viewableIds: {$exists: false}}, {ownerId: ownerId}, {viewableIds: ownerId}];
  return objOfQuery
}
var writePermissions = function(objOfQuery, ownerId)
{
  objOfQuery.ownerId = ownerId;
  return objOfQuery;
}
/**
 * returns a query that will return all owned elements. execute later
 * @param model
 * @param ownerId
 */

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

    res.json(element);
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

app.get("/api/:_model/:_type/:_value", function(req,res){
  console.log("Id: " + req.params._id);
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }
  ret_model.findOne({email : req.params._id}, function(err, job){
    if(err){console.log(err)};
    console.log(job);
    res.json(job);
  });
});

app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
