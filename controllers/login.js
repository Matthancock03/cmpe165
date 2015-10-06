(function(){
  var app = angular.module('Authentication',[]).config(function ($httpProvider) {

        $httpProvider.defaults.headers.common['Authorization'] = 'Basic MUVZT0xPVDVQSk5VQTlCNkZaOUcyWjdGRTo4bjluSzBkeTU4VTIyUEtVWkZQcmxpVVB0eU42bm0yZzRIYVVQdjI3Si9N';
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    });

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
      var url = 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW/accounts?email=' + email;
      var response = $http.jsonp(url, {
        method: 'GET',
        callback: 'JSON_CALLBACK',
        headers:{
          "Accept" : "application/json",
          "Authorization" : "Basic MUVZT0xPVDVQSk5VQTlCNkZaOUcyWjdGRTo4bjluSzBkeTU4VTIyUEtVWkZQcmxpVVB0eU42bm0yZzRIYVVQdjI3Si9N"
        }
        });
      /*
      $http({
      method: 'GET',
      url: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW/accounts?email=' + email,
      headers: {
        "Accept" : "*",
        "Authorization" : "Basic MUVZT0xPVDVQSk5VQTlCNkZaOUcyWjdGRTo4bjluSzBkeTU4VTIyUEtVWkZQcmxpVVB0eU42bm0yZzRIYVVQdjI3Si9N",
    }
      }).then(function successCallback(response) {
        for (property in response) {
          console.log(property + ':' + response[property]+'; ');
        }
      }, function errorCallback(response) {
        console.log("Not working.\n\n");
      });*/
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
      url: 'https://api.stormpath.com/v1/applications/173vkD8p8nkeJb55sXM6WW/accounts',
      headers: {"Accept": "application/json", "Content-Type" : "application/json"},
      data: {
        "givenName": firstName,
        "surname": lastName,
        //"username": "Matth03",
        "email": email,
        "password": password}
      }).then(function successCallback(response) {
        for (property in response) {
          console.log(property + ':' + response[property]+'; ');
        }
      }, function errorCallback(response) {
      console.log("Not working.\n\n");
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });

  })();
