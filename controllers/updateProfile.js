angular.module('myApp').controller('Update', function($location, $http, $scope, User){
  $scope.user = {};
  console.log($location.search().email);
  User.query({email: 'beyondprosthetics@live.com'}, function(users, user){
  $scope.user = users[0];
  console.log(users.length);
  });

  $scope.save = function(){
    console.log("Saved");
    $scope.user.$update();
  }

  $scope.cancel = function(){
    window.location.assign("home");
  }

});
