var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));

app.use('/jobs', require(__dirname + '/routes/jobRoutes'));
app.use('/users', require(__dirname + '/routes/userRoutes'));


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

//Change the API requests to /api/:model/:id later.
// Can be genericized, then we don't need to write any more of these methods!
//Better yet, we can deny specific requests in some instances.
app.post("/api/Job", function(req,res){
  console.log('Post Received.');
  var job = new Job(req.body);
  job.save(function(err, job){
    if(err){
      console.log("Job did not save correctly.");
      return next(err)
    };
    res.json(201, job);
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
    if(err){return next(err)};
    res.json(job);
  });
});
app.get("/api/Job/:id", function(req,res){
  Job.findOne({_id : req.param().id}, function(err, job){
    if(err){return next(err)};
      res.json(job);
  });
});


app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
