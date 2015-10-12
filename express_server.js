var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');
app.get("/", function(req,res){
  res.status(200).sendFile(__dirname + '/views/login.html');
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
app.post("/api/Job", function(req,res){
  console.log('Post Received.');
  //console.log(req);
  console.log(req.body);

  var job = new Job(req.body);
  console.log(job);
  job.save(function(err, job){
    if(err){
      console.log(err);
      console.log(job);
      console.log("Job did not save correctly.");
      return next(err)
    };
    res.json(201, job._id);
  })
});
app.put("/api/Job/:id", function(req,res){
  Job.update({_id : req.param().id}, req.body, function(err, numAffected){
    if(err){return next(err)}
  });

});
app.delete("/api/Job/:id", function(req,res){
  Job.remove({_id : req.params().id},function(err){
    if(err){return next(err)};
  });});

app.get("/api/Job", function(req,res){
  Job.find(function(err, job){
    if(err){
      console.log(err);
      return next(err)};
    console.log(job);
    res.json(job);
  });
});
app.get("/api/Job/:_id", function(req,res){
  console.log(req.param().id);
  Job.findOne({_id : req.param()._id}, function(err, job){
    if(err){return next(err)};
    console.log(job);
    res.json(job);
  });
});
app.listen(process.env.PORT || 9000);
