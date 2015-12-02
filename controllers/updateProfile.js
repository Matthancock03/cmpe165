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
        $scope.user.emailForTags = $scope.user.emailForTags.join(",")
      if(response.data.img){
        $scope.imageExists = true;
      }else{
          $scope.imageExists = false;
      }
      //user = response.data;
      //console.log(user);
  });


    $scope.save = function(file){
    $scope.user.emailForTags = $scope.user.emailForTags.split(" ").join("").toLowerCase().split(",")

        var reader = new FileReader();
    if(typeof file == Blob){
      reader.onloadend = function () {
      console.log($scope.user.email);
      var query = {_id: $scope.user._id};
      $scope.user.img = reader.result;
      User.update(query, $scope.user);
      //$scope.user.save();
      window.location.assign("/profile");
      }
    }else{
      var query = {_id: $scope.user._id};
      User.update(query, $scope.user);
      window.location.assign("/profile");
    }
    reader.readAsDataURL(file);
  };

  $scope.cancel = function(){
    window.location.assign("/profile");
  };

});
