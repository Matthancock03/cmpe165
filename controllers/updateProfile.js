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
      //user = response.data;
      //console.log(user);
  });

  $scope.save = function(file){
    var query = {_id: $scope.user._id};
    console.log(typeof file);

    if(typeof file == 'string' || file == undefined){
      User.update($scope.user);
      window.location.assign("/profile");
    }else{
    var reader = new FileReader();
    reader.onloadend = function () {
    console.log($scope.user.email);
    $scope.user.img = reader.result;
    User.update(query, $scope.user);
    window.location.assign("/profile");
    };

    reader.readAsDataURL(file);
    }
  };

  $scope.cancel = function(){
    window.location.assign("/profile");
  };

});
