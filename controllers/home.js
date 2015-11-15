angular.module('myApp').controller('Home', function($location, $http, $scope, User){

  $http.get('/currentUser').then(function successCallback(response) {
    console.log("Current User call sucessful!");
    //console.log("Email: " + response.data.email);
    $scope.user = response.data;
    if(response.data != undefined){
      $scope.loggedIn = true;

      if(response.data.ownerId != null && response.data.sellerId == null)
        window.location.href = "/authorize";
    }
  }, function errorCallback(response) {
    console.log("Current User error: " + response.error);
  });

  $http.get("http://ipinfo.io").then(function successCallback(response) {
      console.log("Location: " + response.data.city + " " +  response.data.region);
      $scope.location = response.data.city + "," +  response.data.region;
  }, function errorCallback(response) {
    console.log("Current Ip error: " + response.error);
  });

  $scope.searchJobs = function(argument) {
    //console.log("Search for " + $scope.queryParameter);
    window.location.href = "/jobs?_description=" + $scope.queryParameter + "&_location=" + $scope.location;
  };
});
