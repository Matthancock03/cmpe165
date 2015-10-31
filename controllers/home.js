angular.module('myApp').controller('Home', function($location, $http, $scope, User){


  $http.get('/currentUser').then(function successCallback(response) {
    console.log("Current User call sucessful!");
    console.log("Email: " + response.email);
    $scope.user = response;
  }, function errorCallback(response) {
    console.log("Current User error: " + response.error);
  });

});
