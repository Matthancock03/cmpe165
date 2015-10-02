(function(){
  var app = angular.module('Authentication',[])
  var tab = 1;
  app.controller('Auth', function(){

    this.setTab = function(table){
      tab = table;
      console.log("Table set to " + table);
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };

  });

  app.controller('Login', function(){
    this.email = "";
    this.password = "";

    this.submitLogin = function(email, password){
      console.log("Email: " + email + " Password: " + password);
    };
    this.panelNumber = function(panel){
      return tab === panel;
    };
  });

  app.controller('Signup', function(){
    this.email = "";
    this.password = "";
    this.passwordVerfication = "";

    this.submitSignup = function(email, password, passwordVerification){
      console.log("Email: " + email + " Password: " + password + " Verification: " + passwordVerification);
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });

  })();
