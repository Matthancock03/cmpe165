
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

  app.controller('Login', function($http, $location, $window){
    this.email = "";
    this.password = "";

    this.submitLogin = function(email, password){
      console.log("Email: " + email + " Password: " + password);
      $http({
      method: 'POST',
      url: '/login',
      headers:{
        "Accept" : "application/json"
      },
      data: {
        "username": email,
        "password": password
      }
      }).then(function successCallback(response) {
        window.location.assign("jobs");
        for(property in response.headers){
          console.log(response.headers[property]);
        }
      }, function errorCallback(response) {
        console.log("Login error: " + response.error);
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });

  app.controller('Signup', function($http){
    this.email = "";
    this.password = "";
    this.passwordVerfication = "";
    this.firstName = "";
    this.lastName = "";

    this.submitSignup = function(email, password, passwordVerification, firstName, lastName){
      console.log("Email: " + email + " Name: " + firstName + lastName +  " Password: " + password + " Verification: " + passwordVerification);

      $http({
      method: 'POST',
      url: '/register',
      headers: {
        "Accept" : "application/json"
      },
      data: {
        "givenName": firstName,
        "surname": lastName,
        //"username": "Matth03",
        "email": email,
        "password": password}
      }).then(function successCallback(response) {
          $location.url("jobs");
      }, function errorCallback(response) {
        console.log("SignUp error: " + response.error);
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });
