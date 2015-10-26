angular.module('myApp').controller('UserController', function($location, $http, $scope, User){

      $scope.user = {};
      $scope.isUser = ($location.search().isUser == 'true')? true : false ;
      User.query({email: $location.search().email}, function(users, user){
      $scope.user = users[0];
      });

      $scope.editProfile = function(){
        window.location.assign("update");
      };

});
