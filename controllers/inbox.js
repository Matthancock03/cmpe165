angular.module('myApp').controller('Inbox', function($location, $http, $scope, Mail){
  /*var mail = new Mail(); //Just used it to create a couple dummy messages.
  mail.ownerId = "Matthancock03@gmail.com";//The email to send to. NOT THE EMAIL OF THE SENDER!
  mail.senderId = "mrandhawa27@gmail.com";//email sent from. the id of the sender technically.
  mail.links = ["http://mongoosejs.com/docs/middleware.html"]
  mail.sent = false
  mail.body = "Dummy Body";//the body of the email.
  mail.title = "Dummy Title";//the title
  mail.$save(function () {
    console.log("Message saved :");
  }); */

$http.get('/currentUser').then(function successCallback(response) {
    //console.log("Current User call sucessful!");
    //console.log("Email: " + response.data.email);
    $scope.user = response.data;
    //console.log(this.user);
  });

  Mail.query({ownerId: "Matthancock03@gmail.com"}, function(messages){
      $scope.inMessages = messages;
      console.log(messages[0]);
  });
});
