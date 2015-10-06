var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));

app.use(stormpath.init(app, {
  website: true
}));


app.get("/", function(req,res){
  res.status(200).sendFile(__dirname + '/views/login.html');
});

app.post("/home", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
});

app.get("/jobs", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})

app.get("/create", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})

// Listen for incoming requests and serve them.
app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000, function() {
    console.log("Starting server...");
  });
});
