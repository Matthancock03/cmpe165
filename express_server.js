var express = require('express');

var app = express();
<<<<<<< HEAD

=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
=======
//When you add a model, require it, then return it when the model name matches the actual model name
//Make sure to put the same model name in MyApp or it won't work!
// You can add models to access Authorization tokens, but please don't include them in the retrieveModel section.
// it will cause no end of grief as the generalized model we have running here will break down
// because it's a type of model we don't want them to access.
var Job = require(__dirname +'/models/job');
var Comment = require(__dirname + '/models/comment');
var User = require(__dirname + '/models/user');
>>>>>>> refs/remotes/origin/master

app.listen(process.env.PORT || 9000);
