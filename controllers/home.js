angular.module('myApp').controller('Home', function($location, $http, $scope, User){

  $http.get('/currentUser').then(function successCallback(response) {
    console.log("Current User call sucessful!");
    console.log("Email: " + response.data.email);
    $scope.user = response.data;
    if(response.data != undefined){
      $scope.loggedIn = true;
    }
  }, function errorCallback(response) {
    console.log("Current User error: " + response.error);
  });
});
