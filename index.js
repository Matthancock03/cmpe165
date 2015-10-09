var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');

var app = express();
//app.use = (bodyParser.json());

app.use(stormpath.init(app, {
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW'
  },
  website: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));

app.get("/", function(req,res){
    console.log(req.headers.cookie);
  res.status(200).sendFile(__dirname + '/views/login.html');
});

app.get("/jobList", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/joblist.html');
})

app.get("/jobform", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})

app.post("/createJob", function(req,res){
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


app.get("/getJob", function(req,res){
  Job.find(function(err, job){
    if(err){return next(err)};
    res.json(job);
  });
});


app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
