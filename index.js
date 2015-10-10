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




app.get("/", function(req,res){
    console.log(req.headers.cookie);
  res.status(200).sendFile(__dirname + '/views/login.html');
});

app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
