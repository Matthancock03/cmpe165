angular.module('myApp').controller('appHistory', function($location, $http, $scope, User, Application) {

    $http.get('/currentUser').then(function successCallback(response) {//retrieves the current user.
        console.log("Current User call sucessful!");
        console.log("Email: " + response.data.email);
        if(response.data.email == undefined){
            $scope.loggedIn = false;
        }else{
            $scope.loggedIn = true;
        }
        $scope.user = response.data;
        $scope.pastApplications = Application.query({ ownerId: $scope.user.ownerId},//query requesting all elements where ownerId matches the current user's ownerId
            function(err) {
                console.log($scope.jobs);
                $scope.user//the current user
                $scope.pastApplications//all applications by the user
                //Your code here Rafael.

            });
    });

});