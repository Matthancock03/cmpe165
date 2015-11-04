angular.module('myApp').controller('UserController', function($location, $http, $scope, User, Mail, Review, Job) {

  $http.get('/currentUser').then(function successCallback(response) {
    if ($location.search().email == undefined) {
      $scope.user = response.data;
      $scope.isUser = true;

      if (response.data.img) {
        $scope.imageExists = true;
      } else {
        $scope.imageExists = false;
      }
    }
    $scope.currentUser = response.data;
  });

  if ($location.search().email != undefined) {
    $scope.isUser = false;

    User.query({
      email: $location.search().email.toLowerCase()
    }, function(users) {
      if (users.length == 1) { // only one element
        $scope.user = users[0];
        if (users[0].img) {
          $scope.imageExists = true;
        } else {
          $scope.imageExists = false;
        }
      } else {
        console.log(users);
        console.log(users.length);
      }
    });
  };

Job.query({employee: "matthancock03@gmail.com"}, function(jobs){
        $scope.jobs = jobs;
});

    
  $scope.sendMessage = function() {

    console.log("Current User: " + $scope.currentUser.email);
    console.log("User: " + $scope.user.email);
    console.log("Title: " + $scope.messageTitle);
    console.log("Message: " + $scope.messageBody);


    var mail = new Mail();
    mail.ownerId = $scope.user.email;
    mail.senderId = $scope.currentUser.email;
    mail.links = ["http://mongoosejs.com/docs/middleware.html"]
    mail.sent = false
    mail.body = $scope.messageBody;
    mail.title = $scope.messageTitle;

    mail.$save(function() {
      console.log("Message saved");
    });

    $scope.showSuccessAlert = true;
  };

  $scope.editProfile = function() {
    window.location.assign("update");
  };


});
