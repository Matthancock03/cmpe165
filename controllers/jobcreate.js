/**
 * Created by johnfranklin on 10/1/15.
 */

//var app = angular.module('myApp',['ngRoute', 'angoose.client']);
angular.module('myApp').controller('jobcreate', function($scope, $routeParams, Job){
    console.log("This is running!");
    if($routeParams.id != null)
        $scope.master = Job.$get({'_id' : $routeParams.id});
    if($scope.master == null)
    {
        $scope.master = new Job({
            userID: "???",
            title: "Is this working?",
            description: "",
            wages: 0,
            time: Date.now(),
            location: ""
        });
        Job.$save();
    }
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
    };
    $scope.reset();
    $scope.submit = function()
    {
        $scope.userjob.save(function(err,res){
            if(err) return alert(err);
        });
        console.log($scope.userjob);
    }


});
