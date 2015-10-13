/**
 * Created by johnfranklin on 10/1/15.
 */

//var app = angular.module('myApp',['ngRoute', 'angoose.client']);
angular.module('myApp').controller('jobcreate', function($scope, $location, Job){
    console.log("This is running!");
    console.log($location);
    console.log($location.search()._id);
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
        console.log($scope.userjob);
    };
    if($location.search()._id != null) {
        console.log($location.search()._id);
        $scope.master = $scope.userjob = Job.get({'_id' : $location.search()._id}, function(){
            $scope.reset();
        });
        $scope.submit = function()
        {
            $scope.userjob.$save(function() {

                window.location.href = "/jobdisplay?_id="+$scope.userjob._id;
            })
            console.log($scope.userjob);
        }
    }
    if($scope.master == null)
    {

        $scope.master = {
            userID: "???",//What are we doing for this?
            title: "",
            description: "",
            wages: 0,
            time: null,
            location: ""
        }
        $scope.reset();
        $scope.submit = function()
        {
            console.log($scope.userjob);
            $scope._id = Job.save($scope.userjob, function() {
                if($scope._id != null)
                    window.location.href = "/jobdisplay?_id="+$scope._id;
            })

        }
    }





});
