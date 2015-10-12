/**
 * Created by johnfranklin on 10/1/15.
 */

//var app = angular.module('myApp',['ngRoute', 'angoose.client']);
angular.module('myApp').controller('jobcreate', function($scope, $location, Job){
    console.log("This is running!");
    console.log($location);
    console.log($location.search()._id);
    if($location.search()._id != null) {
        console.log($location.search()._id);
        $scope.master = Job.get({'_id' : $location.search()._id});
    }
    if($scope.master == null)
    {
        var d = new Date().setSeconds(0,0);
        $scope.master = {
            userID: "???",
            title: "",
            description: "",
            wages: 0,
            time: new Date(d),
            location: ""
        }

    }
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
        console.log($scope.userjob);
    };
    $scope.reset();
    $scope.submit = function()
    {
        $scope.id = Job.save($scope.userjob, function() {
            console.log($scope.id);
            //transfer to jobdisplay.
            //edit will take you to
        })
        console.log($scope.userjob);
    }


});
