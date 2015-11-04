angular.module('myApp').controller('Update', function($location, $http, $scope, User){

$http.get('/currentUser').then(function successCallback(response) {
      //console.log("Current User call sucessful!");
      //console.log("Email: " + response.data.email);
      console.log(response.data);
      $scope.user = User.get({_id: response.data._id}, function(user){
    $scope.save = function(){
      console.log("Saved");
      //User.update($scope.user);
      $scope.user.$update();
      window.location.assign("/profile");
    }
  });
      //user = response.data;
      //console.log(user);
  });

  $scope.cancel = function(){
    window.location.assign("/profile");
  }

});
