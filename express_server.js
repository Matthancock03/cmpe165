var express = require('express');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//When you add a model, require it, then return it when the model name matches the actual model name
//Make sure to put the same model name in MyApp or it won't work!
// You can add models to access Authorization tokens, but please don't include them in the retrieveModel section.
// it will cause no end of grief as the generalized model we have running here will break down
// because it's a type of model we don't want them to access.
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));

app.get("/", function(req,res){
  res.status(200).sendFile(__dirname + '/views/login.html');
});

app.get("/termsModal", function(req,res){
  res.status(200).sendFile(__dirname + '/views/templates/modalTerms&Agreement.html');
});

app.post("/home", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
});

app.get("/jobs", function(req,res){
  res.status(200).sendFile(__dirname + '/views/joblist.html');
})

app.get("/jobDisplay", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobDisplay.html');
})

app.get("/create", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})

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


app.post("/api/:_model", function(req,res){
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
app.put("/api/:_model/:_id", function(req,res){
  console.log("In Put!")
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }
  ret_model.update({_id : req.params._id}, req.body, function(err, numAffected){
    if(err){console.log(err)}
    console.log("In Put callback!")
  });

});
app.delete("/api/:_model/:_id", function(req,res){
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, { error : "Invalid Request"});
    return;
  }
  ret_model.remove({_id : req.params._id},function(err){
    if(err){console.log(err)};
  });});

app.get("/api/:_model", function(req,res){
  console.log(req.params._model);
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }
  ret_model.find(function(err, job){
    if(err){
      console.log(err);
      };
    console.log(job);
    res.json(job);
  });
});

app.get("/api/:_model/:_id", function(req,res){
  console.log(req.params._id);
  var ret_model = retrieveModel(req.params._model);
  if(ret_model == null)
  {
    res.json(201, {error : "Invalid Request"});
    return;
  }
  ret_model.findOne({_id : req.params._id}, function(err, job){
    if(err){console.log(err)};
    console.log(job);
    res.json(job);
  });
});

app.listen(process.env.PORT || 9000);
