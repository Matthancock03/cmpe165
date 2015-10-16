angular.module('myApp').controller('UserController', function($location, User){
      this.userProfile;
      User.findOne({'email': $location.search()._id}, function(err, user){
        this.userProfile = user;
      });
});
