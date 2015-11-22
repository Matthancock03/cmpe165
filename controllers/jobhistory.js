angular.module('myApp').controller('jobHistory', function($location, $http, $scope, User, Application, Job) {

    $http.get('/currentUser').then(function successCallback(response) {
        console.log("Current User call sucessful: ");
        console.log("Email: " + response.data.email);
        if(response.data.email == undefined){
            $scope.loggedIn = false;
        }else{
            $scope.loggedIn = true;
        }
        $scope.user = response.data;
        console.log($scope.user.email);
        //console.log($scope.user.ownerId);
        $scope.pastJobs = Job.query({
            ownerId: $scope.user.email
            //ownerId: $scope.user.ownerId
        },function(elems, err){
            console.log(elems)
        });


    });


});

