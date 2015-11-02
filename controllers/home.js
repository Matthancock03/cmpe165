angular.module('myApp').controller('Home', function($location, $http, $scope, User){
  $http.get('/currentUser').then(function successCallback(response) {
    console.log("Current User call sucessful!");
    console.log("Email: " + response.data.email);
    if(response.data.email == undefined){
      $scope.loggedIn = false;
    }else{
      $scope.loggedIn = true;
      if(response.data.customerId == null)
        window.location.href = "/authorize";
    }
    $scope.user = response.data;
  }, function errorCallback(response) {
    console.log("Current User error: " + response.error);
  });

});
