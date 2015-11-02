
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
        window.location = "home";
        for(property in response.headers){
          console.log(response.headers[property]);
        }
      }, function errorCallback(response) {
        alert(response.data.error);
      });
    };

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });

  angular.module('myApp').controller('Signup', function($http, $location, User) {
    this.user = new User();
    this.passwordVerification = "";
    console.log()
    this.submitSignup = function(user, passwordVerification){
      user.ownerId = user.email;
<<<<<<< HEAD
//<<<<<<< HEAD

      $http({
      method: 'POST',
      url: '/register',
      headers: {
        "Accept" : "application/json"
      },
      data: {
        "givenName": user.firstName.toLowerCase(),
        "surname":   user.lastName.toLowerCase(),
        //"username": "Matth03",
        "email": user.email.toLowerCase(),
        "password": user.password}
      }).then(function successCallback(response) { //On sucessful callback from Stormpath request create new User and save.
        console.log("Stormpath sucessful");
        //console.log("Email: " + user.email + " Name: " + user.firstName + " " + user.lastName +  " Password: " + user.password + " Verification: " + passwordVerification);
        user.$save(function(){
          console.log("User saved :");
          for(property in user){
            console.log(property + " " + user[property]);
          }//Ooh. this'll be useful later. I can make the connection of models to the REST API really simple with this.
//=======
=======
      
>>>>>>> master
      console.log()
      if(user.password == passwordVerification) {
        $http({
          method: 'POST',
          url: '/register',
          headers: {
            "Accept": "application/json"
          },
          data: {
            "givenName": user.firstName.toLowerCase(),
            "surname": user.lastName.toLowerCase(),
            //"username": "Matth03",
            "email": user.email,
            "password": user.password
          }
        }).then(function successCallback(response) { //On sucessful callback from Stormpath request create new User and save.
          console.log("Stormpath sucessful");
          console.log("Email: " + user.email + " Name: " + user.firstName + " " + user.lastName + " Password: " + user.password + " Verification: " + passwordVerification);
          user.$save(function () {
            console.log("User saved :");
            for (property in user) {
              console.log(property + " " + user[property]);
            }//Ooh. this'll be useful later. I can make the connection of models to the REST API really simple with this.
          });
          window.location = "home";
        }, function errorCallback(response) {
          alert(response.data.error);
<<<<<<< HEAD
///>>>>>>> John's-additions
=======
>>>>>>> master
        });
      }
      else
        alert("Passwords don't match.");
    });

    this.panelNumber = function(panel){
      return tab === panel;
    };
  });} })
