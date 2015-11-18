angular.module('myApp').controller('UserController', function($location, $http, $scope, User){

      $scope.user = {};
      $scope.isUser = ($location.search().isUser == 'true')? true : false ;
      User.query({email: $location.search().email}, function(users, user){

      if(users.length == 1)// only one element
            $scope.user = users[0];
      else{}
            console.log(users);
      console.log(users.length);
      });

      $scope.editProfile = function(){
        window.location.assign("update");
      };
});
