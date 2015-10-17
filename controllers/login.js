
  var tab = 1;

  angular.module('myApp').controller('Auth', function(){

    this.setTab = function(table){
      tab = table;
      console.log("Table set to " + table);
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };

  });

  angular.module('myApp').controller('Login', function($http, $location, $window){
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
        window.location.assign("home/?" + email);
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

  angular.module('myApp').controller('Signup', function($http, User){
    this.email = "";
    this.password = "";
    this.passwordVerfication = "";
    this.firstName = "";
    this.lastName = "";

    User.find({}, function(err, users){
      console.log(users);
    });
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
      }).then(function successCallback(response) { //On sucessful callback from Stormpath request create new User and save.
          $location.url("home/?" + email);
      }, function errorCallback(response) {
        console.log("SignUp error: " + response.error);
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });
