var express = require('express');
var bodyParser = require('body-parser');

var angoose = require("angoose");

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));
require("angoose").init(app, {
  'module-dirs': __dirname + '/models',
  'mongo-opts': 'localhost:27017/test',
  logging:'TRACE'
});
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


app.listen(process.env.PORT || 9000);
