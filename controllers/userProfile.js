angular.module('myApp').controller('UserController', function($location, User){
      this.userProfile;
      this.firstName = "Matt";
      this.lastName = "Hancock";
      this.about = "Pretty much a boss at life. I can do whatever it is that you need."
      this.skills = ['Being a Boss', 'Doing My Thing', 'Getting Paper'];

      var user = User.get({_id: 'matthancock03@gmail.com'}, function(){
          console.log(user.firstName);
      });
});
