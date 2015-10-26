angular.module('myApp').controller('UserController', function($location, $scope, User){
      $scope.firstName = "Joe";
      $scope.lastName = "Public";
      $scope.about = "Pretty much a boss at life. I can do whatever it is that you need."
      $scope.skills = ['Being a Boss', 'Doing My Thing', 'Getting Paper'];
      $scope.user = {};
      User.query({email: $location.search().email}, function(users, user){
      if(users.length == 1)// only one element
            $scope.user = users[0];
      else{}
            console.log(users);
      console.log(users.length);
      });
});
