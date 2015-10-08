var express = require('express');
var stormpath = require('express-stormpath');

var app = express();
app.use(stormpath.init(app, {
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW'
  },
  website: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));

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


app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
