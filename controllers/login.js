
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
        window.location.assign("home");
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

  angular.module('myApp').controller('Signup', function($http, $location, User){
    this.user = new User();
    this.passwordVerfication = "Rachael69";


    this.submitSignup = function(user, passwordVerification){
      console.log("Email: " + user.email + " Name: " + user.firstName + " " + user.lastName +  " Password: " + user.password + " Verification: " + passwordVerification);
      user.$save(function(){
        console.log("User saved :");
        for(property in user){
          console.log(property + " " + user[property]);
        }
      });

      $http({
      method: 'POST',
      url: '/register',
      headers: {
        "Accept" : "application/json"
      },
      data: {
        "givenName": user.firstName,
        "surname":   user.lastName,
        //"username": "Matth03",
        "email": user.email,
        "password": user.password}
      }).then(function successCallback(response) { //On sucessful callback from Stormpath request create new User and save.
          console.log("Stormpath sucessful");
          window.location.assign("home");
      }, function errorCallback(response) {
        console.log("SignUp error: " + response.error);
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });
