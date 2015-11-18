angular.module('myApp').controller('Inbox', function($location, $http, $scope, User){

  $http({
  method: 'GET',
  url: '/currentUser',
  headers:{
    "Accept" : "application/json"
  }
  }).then(function successCallback(response) {
    console.log("Current User call sucessful!");
    console.log("Email: " + response.data.email);
    if(response.data.email == undefined){
      $scope.loggedIn = false;
    }else{
      $scope.loggedIn = true;
    }
    $scope.user = response.data;
  }, function errorCallback(response) {
    console.log("Current User error: " + response.error);
  });

  
});
