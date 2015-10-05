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

  app.controller('Login', function($http){
    this.email = "";
    this.password = "";

    this.submitLogin = function(email, password){
      console.log("Email: " + email + " Password: " + password);
      /*$http.get("https://api.stormpath.com/v1/applications/1JcFMH3kdfpBj4SS0abfQi/accounts?email=tk421@stormpath.com", {
      headers: {"Accept": "application/json"}
      });*/

      $http({
      method: 'GET',
      url: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW/accounts?email=tk421@stormpath.com',
      headers: {"Accept": "application/json"}
      }).then(function successCallback(response) {
        for (property in response) {
          console.log(property + ':' + response[property]+'; ');

        }
      }, function errorCallback(response) {
        for (property in response) {
          console.log(property + ':' + response[property]+'; ');

        }
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

    this.submitSignup = function(email, password, passwordVerification){
      console.log("Email: " + email + " Password: " + password + " Verification: " + passwordVerification);

      $http({
      method: 'POST',
      url: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW/accounts',
      headers: {"Accept": "application/json", "Content-Type" : "application/json"},
      data: {
        "givenName": "Matt",
        "surname": "Hancock",
        "username": "Matth03",
        "email": "matt-hancock@live.com",
        "password":"wordup"}
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
      console.log("Not working.\n\n");
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });

  })();
