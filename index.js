var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));

var stormpathMiddleware = stormpath.init(app, {
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW'
  },
  expandCustomData: true,
  enableForgotPassword: true,
  website: {
      login: {
        enabled: true,
        nextUri: __dirname + '/views/jobform.html'
      }
    }
});

app.use(stormpathMiddleware);


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
