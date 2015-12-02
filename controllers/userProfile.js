angular.module('myApp').controller('UserController', function($location, $http, $scope, User, Mail, Review, Job) {
  var revCallback = function(elems) {
    $scope.blank = new Review();
    $scope.total = 0.0;
    $scope.ratings = elems

  console.log($scope.ratings);
    if ($scope.ratings.length <= 0) {
      $scope.noreviews = true;
    }
    else {
      for (var i = 0; i < $scope.ratings.length; i++) {
        if ($scope.ratings[i].stars)
          $scope.total += $scope.ratings[i].stars
      }
      $scope.total /= $scope.ratings.length;
    }
    $scope.loaded = true;
  }
  $http.get('/currentUser').then(function successCallback(response) {
    if ($location.search().email == undefined) {
      $scope.user = response.data;
      $scope.isUser = true;
      Review.query({reviewee: $scope.user.ownerId},revCallback);
      if (response.data.img) {
        $scope.imageExists = true;
      } else {
        $scope.imageExists = false;
      }
      if(response.data.userName.length > 1){
        $scope.userNameExists = true;
      }else{
        $scope.userNameExists = false;
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
        console.log("before review!")
        Review.query({reviewee: $scope.user.ownerId},revCallback)
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
    mail.links = []
    mail.sent = false
    mail.body = $scope.messageBody;
    mail.title = $scope.messageTitle;

    mail.$save(function() {
      console.log("Message saved");
    });

    $scope.showSuccessAlert = true;
  };
  $scope.loadReview = function(review)
  {

    $scope.rev = review;
    console.log($scope.rev)

    //load into review submitter?
  }

$scope.editProfile = function() {
  window.location.assign("update");
};

  $scope.submit = function(){
    if(!$scope.rev.reviewee)
      $scope.rev.reviewee = $scope.user.email;
    if(!$scope.rev._id)
      $scope.rev.$save().then(function(){
            location.reload()
      })
    else
      $scope.rev.$update().then(function(){
        location.reload()
      })
  }

});
