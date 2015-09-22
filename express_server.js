var express = require('express');
var app = express();

app.get("/", function(req,res){
  res.status(200).send('Hello World!');
});

app.listen(process.env.PORT || 9000);
