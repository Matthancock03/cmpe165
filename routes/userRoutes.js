var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var Comment = require(path.join(__dirname , '../models/comment'));
var User = require(path.join(__dirname , '../models/user'));

var userRouter = express.Router();

userRouter.post("/createUser", function(req,res){ // Saves new Job with parameters passed into url.
  console.log('User Received.');
  console.log(req.body.userID);
  console.log(req.body.body);
  var user = new User({
    userID: '01',
    firstName: "Matthew",
    lastName: "Hancock",
    email: "matthancock03@gmail.com"
  });
  user.save(function(err, user){
    if(err){
      console.log("Job did not save correctly.");
      return next(err)
    };
    res.json(201, user);
  })
});

// Returns list of all jobs
userRouter.get("/getUsers", function(req,res){
  User.find(function(err, user){
    if(err){return next(err)};
    res.json(user);
  });
});


module.exports = userRouter;
