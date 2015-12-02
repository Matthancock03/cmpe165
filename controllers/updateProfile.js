var app = angular.module('UpdateProfile',['ngRoute', 'ngResource', 'ngFileUpload']).config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.factory("User", function($resource) {
    return $resource('api/' + "User" +'/:_id', { _id: '@_id' }, {
        update: {
            method: 'PUT'
        }

    });
});

angular.module('UpdateProfile').controller('Update', function($location, $http, $scope, User, Upload){

$http.get('/currentUser').then(function successCallback(response) {
      $scope.user = response.data;
      $scope.user.emailForTags = $scope.user.emailForTags.join(",")
      if(response.data.img){
        $scope.imageExists = true;
      }else{
          $scope.imageExists = false;
      }
      //user = response.data;
      //console.log(user);
  });


    $scope.save = function(file){
    if($scope.user.emailForTags.constructor !== Array)
    {
        $scope.user.emailForTags = $scope.user.emailForTags.split(" ").join("").toLowerCase().split(",")
    }

    var reader = new FileReader();
    var query = {_id: $scope.user._id};
        console.log("IN BLOB")
        reader.onloadend = function () {
            console.log($scope.user.email);
            $scope.user.img = reader.result;

            User.update(query, $scope.user)
            // GOOD LORD, this is horrifying code. The things I put up with because I don't have the time to find a good solution. I can't get callbacks to work with update, so...
            // console.log outputs the object, which requires processing proportional to the length of the object, enough time for the update to be sent.
            // not only is this busy waiting, but if someone trys to "optimize" the code and comment or delete the print statement, you could search for the resulting bug for hours and never figure it out.
            // The scariest part about this is that the issue with page reloads went unnoticed because I had been putting print statements like those before every page reload when I was tweaking with each page just to figure out the cause of the problem; whenever the problem went away I never thought it was the comment.
            // tl,dr; If you remove the log statement, this code and the code in jobCreate and other pages that reload immediately after update will not work. Disgusting.
            console.log($scope.user)
            window.location.href = "/profile";

            //window.location.assign("/profile");
            };

        reader.readAsDataURL(file);
        //window.location.assign("/profile");
  };

  $scope.cancel = function(){
    window.location.assign("/profile");
  };

});
