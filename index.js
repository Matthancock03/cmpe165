// Import required modules.
var express = require('express');
var stormpath = require('express-stormpath');

// Initialize our Express app.
var app = express();
app.set('views', './views');
// Configure Stormpath.
/*app.use(stormpath.init(app, {
  application: process.env.STORMPATH_URL,
  redirectUrl: '/dashboard',
})); */

var stormpathMiddleware = stormpath.init(app, {
  //apiKeyFile: '/apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/1JcFMH3kdfpBj4SS0abfQi',
  //secretKey: 'foqiy4t98*98z98098)(*U*&GIMUGYGHDNFOQEQ)(*E)ERIFQIN)UH*&FH)*WHF)@IF',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

// Generate a simple home page.
app.get('/', function(req, res) {
  res.send("Hey there! Thanks for visting the site! Be sure to <a href='/login'>login</a>!");
});

// Generate a simple dashboard page.
//app.get('/dashboard', stormpath.loginRequired, function(req, res) {
//  res.send('Hi: ' + req.user.email + '. Logout <a href="/logout">here</a>');
//});

// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 9000);
