var app = angular.module('UpdateProfile',['ngRoute', 'ngResource', 'ngFileUpload']).config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.factory("User", function($resource) {
    return $resource('api/' + "User" +'/:_id', { _id: '@_id' }, {
        update: {
            method: 'PUT'
        }

    });
});

angular.module('UpdateProfile').controller('Update', function($location, $http, $scope, User, Upload){

$http.get('/currentUser').then(function successCallback(response) {
      $scope.user = response.data;
      if(response.data.img){
        $scope.imageExists = true;
      }else{
          $scope.imageExists = false;
      }
      //console.log("Current User call sucessful!");
      //console.log("Email: " + response.data.email);
      /*console.log(response.data);
      $scope.user = User.get({_id: response.data._id}, function(user){
    $scope.save = function(){
      console.log("Saved");
      //User.update($scope.user);
      $scope.user.$update();
      window.location.assign("/profile");
    }
  });*/
      //user = response.data;
      //console.log(user);
  });

  $scope.save = function(file){
    //console.log(file);
    var reader = new FileReader();
    if(file){
    reader.onloadend = function () {
    console.log($scope.user.email);
    var query = {_id: $scope.user._id};
    $scope.user.img = reader.result;
    User.update(query, $scope.user);
    window.location.assign("/profile");
    };
    reader.readAsDataURL(file);
    }else{
      var query = {_id: $scope.user._id};
      User.update(query, $scope.user);
      window.location.assign("/profile");
    }
  };

  $scope.cancel = function(){
    window.location.assign("/profile");
  };

});
