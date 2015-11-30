
var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');

//When you add a model, require it, then return it when the model name matches the actual model name
//Make sure to put the same model name in MyApp or it won't work!


var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/models'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules/ng-file-upload/dist'));

app.set('view engine', 'jade');
/**
 *  Initializes stormpath middleware. To run locally you will need to export the the api key and secret.
 */

app.use(stormpath.init(app, {
  client: {
    apiKey:{
      id: '1EYOLOT5PJNUA9B6FZ9G2Z7FE',//Needs to be removed before deployment
      secret: "8n9nK0dy58U22PKUZFPrliUPtyN6nm2g4HaUPv27J/M" //Needs to be removed before deployment
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW',
  },
  web: {
    register: {
      enabled: true,
      autoLogin: true,
      view: __dirname + '/views/jade/log.jade',
      nextUri: '/',
    },
    login: {
      view: __dirname + '/views/jade/log.jade', //path.join(__dirname,'views','login.ejs') // Route used in documentation
      nextUri: '/',
    }
  },
  baseUrl: "/",
  website: true,
  api: true
}));

//When you add a model, require it here as the name of model; make it a property of dbmodels.
//Make sure to put the same model name in MyApp including capitalization. or it won't work!
db = require(__dirname +'/database');

dbRoutes = require(__dirname + '/routes/dbRoutes')
app.use("/api", dbRoutes);
var dbmodels = dbRoutes.dbmodels;//

/**
 *   Routes
 */

app.get("/currentUser", function(req,res, next){
  if(req.user == undefined){
    res.status(200).send({loggedIn: false});
  }else{
    dbmodels.User.findOne({email : req.user.email}, function(err, user){

      if(err){return next(err);};
      //console.log("User: " + user);
      res.status(200).send(user);
    });
    //res.status(200).send(req.user);
  }
});


app.get("/", function(req,res){
  res.status(200).sendFile(__dirname + '/views/home.html');
});
app.get("/jobhistory", function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobHistory.html');
})

app.get("/home", function(req,res){
  res.status(200).sendFile(__dirname + '/views/home.html');
});

app.get("/about", function(req,res){
  res.status(200).sendFile(__dirname + '/views/about.html');
});

app.get("/profile", stormpath.loginRequired, function(req,res){
  //console.log("Current user email is: " + req.user.email);
  res.status(200).sendFile(__dirname + '/views/userProfile.html');
});
app.get("/update", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/updateProfile.html');
});
app.get("/jobs", function(req,res){
  res.status(200).sendFile(__dirname + '/views/joblist.html');
})

app.get("/jobDisplay",stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobDisplayNew.html');
})

app.get("/create", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/jobform.html');
})
app.get("/login", function(req,res){
  if(req.user != undefined){
    res.status(200).sendFile(__dirname + '/views/home.html');
  }else{
    res.status(200).sendFile(__dirname + '/views/login.html');
  }
});

app.get("/inbox", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/inbox.html');
})
app.get("/apphistory", stormpath.loginRequired, function(req,res){
  res.status(200).sendFile(__dirname + '/views/applicationHistory.html');
})
app.get("/stripePaymentSetup", function(req,res){
  res.status(200).sendFile(__dirname + '/views/stripePaymentUI.html');
})
app.get("/contract", function(req,res){
  res.status(200).sendFile(__dirname + '/views/templates/modalTerms&Agreement.html');
})

var stripe = require("stripe")(
    "sk_test_1q9nLen2GaP2Q6Z2o5jpzM97"
);


app.post("/paymentSetup", stormpath.loginRequired, function(req, res, next) {

  console.log(req.body);
  dbmodels.User.findOne({ownerId: req.user.email}, function (err2, user) {
    stripe.customers.create({
      description: 'Customer for test@example.com',
      source: req.body.id // obtained with Stripe.js
    },function(err, customer)
    {
      if(err != null)
        return next(err);
      user.customerId = customer.id;
      console.log(user.customerId)
      user.save();
    })
  })
})

app.post("/payments", stormpath.loginRequired, function(req, res, next) {


  dbmodels.Application.findOne({_id : req.body._id}, function (err1, application) {
    dbmodels.User.findOne({email: application.ownerId}, function (err2, user) {
      if(user.sellerId == null)//???
      {
        console.log("???")
        return {redirectURI: "/jobs"}
      }
      dbmodels.User.findOne({email: req.user.email}, function (err2, user2) {
        if(user2.customerId == null) {
          console.log("???2")
          return res.res(500, "/stripePaymentSetup");
        }
        if(!application.signed) {
          console.log("???3")
          return
        }
        dbmodels.Job.findOne({_id: application.jobId}, function (err3, job) {//May want to consider an async library of sorts. 3 of these calls could be made at the same time instead of waiting for the db to do its thing. slow.
          var index = job.applicantSignatureData.map(function(a) {return a.ownerId;}).indexOf(application.ownerId);
          if(index >= 0 && job.applicantSignatureData[index].paymentNum < 2)//only allowing 1 participant? what's the plan?
          {
            var amount;
            if (!job.wagesMax)
              amount = job.wages / 2 * 100
            else if(req.body.bid != application.bid)//shenanegans prevention
              return;
            else
              amount = application.bid;
            stripe.charges.create({//could handle on the application model, but application's editable by the user. bad idea.
              amount: amount,//hm. an array of booleans? maybe define signatureIds?
              currency: "usd",
              customer: user.customerId,
              description: job.description
            }, {stripe_account: user.sellerId}, function (err, charge) {
              // asynchronously called
              if (err != null) {
                return next(err);
                console.log(err);
              }
              job.applicantSignatureData[index].paymentNum++;
              if (job.applicantSignatureData[index] >= 2) {
                job.paidTwice++;
                if (job.paidTwice >= job.totalParticipantNum)
                  job.done = true;
              }
              job.save();
            });
          }
          //What should we do when payment is finished?
          //create mail.


        });
      });
    });// To
  });
});

var TOKEN_URI = 'https://connect.stripe.com/oauth/token';
var AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';

var qs = require('querystring');
var request = require('request');

//From stripe's examples of how to set this up
app.get('/authorize', stormpath.loginRequired, function(req, res) {
  // Redirect to Stripe /oauth/authorize endpoint
  res.redirect(AUTHORIZE_URI + '?' + qs.stringify({
        response_type: 'code',
        scope: 'read_write',
        client_id: 'ca_7ELzHCsxpLq49g5HbpDtxFHCi3jJGfFk'
      }));
});

app.get('/oauth/callback', stormpath.loginRequired, function(req, res) {
  var code = req.query.code;
  // Make /oauth/token endpoint POST request
  request.post({
    url: TOKEN_URI,
    form: {
      grant_type: 'authorization_code',
      client_id: 'ca_7ELzHCsxpLq49g5HbpDtxFHCi3jJGfFk',
      code: code,
      client_secret: 'sk_test_1q9nLen2GaP2Q6Z2o5jpzM97'
    }
  }, function(err, r, body) {
    if(err){return next(err);};
    var obj = JSON.parse(body)
    console.log(req.user.email);
    console.log(body);
    //console.log(body);
    // Do something with your accessToken
    dbmodels.User.findOne({email: req.user.email}, function(err, user){
      if(err){return next(err);};
      console.log(user);
      user.sellerId = obj.stripe_user_id;
      user.save();
    })
    res.redirect("/stripePaymentSetup?newUrl=home");
    // For demo's sake, output in response:
    //Instead, let's load a page where the user inputs their credit card info.
    //alternatively, instead of redirecting here, we can just block off creating jobs if you have no credit card info
    // and block off applying for jobs if they have no stripe account.
    //or, we could just mandate the stripe account and require credit card info once when they make their first payment

  });
});


app.on('stormpath.ready', function() {
  app.listen(process.env.PORT || 9000);
  console.log("Starting server...");
});
