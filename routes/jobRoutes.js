var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path'); // Express throws error when trying to use relative paths in router. Use path.join to give paths to files.

var jobRouter = express.Router(); //Create router for jobs paths

jobRouter.get("/jobList", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(path.join(__dirname , '../views/joblist.html'));
})

jobRouter.get("/jobform", function(req,res){
  res.status(200).sendFile(path.join(__dirname , '../views/jobform.html'));
})

jobRouter.post("/createJob", function(req,res){ // Saves new Job with parameters passed into url.
  console.log('Post Received.');
  console.log(req.body.userID);
  console.log(req.body.body);
  var job = new Job({
    userID: '01',
    title: "Finish this project!",
    wage: "One million dollars",
    description: "We really need to finish this project. As I don't believe that any of you, besides John, will ready this I'm going to go on record as saying that I am the greatest."
  });
  job.save(function(err, job){
    if(err){
      console.log("Job did not save correctly.");
      return next(err)
    };
    res.json(201, job);
  })
});

// Returns list of all jobs
jobRouter.get("/getJobs", function(req,res){
  Job.find(function(err, job){
    if(err){return next(err)};
    res.json(job);
  });
});




module.exports = jobRouter; // Returns module so that it can be included in the server
