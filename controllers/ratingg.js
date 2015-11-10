

angular.module('myApp').controller('ratingUser', function($scope, $http, User)
{ 
  
          $http.get('/currentUser').then(function(response){
                $scope.user = response.data;
               // $scope.notOwner = !($scope.user.email == $scope.userjob.ownerId)//Need to know if you are the applicant or the owner
            }, function errorCallback(response) {
                console.log("Current User error: " + response.error);
            })
        });
