/**
 * Created by johnfranklin on 10/2/15.
 */

//var app = angular.module('myApp',["angoose.client"])
angular.module('myApp').controller('joblist', function($scope, Job){
    $scope.jobs = Job.query(function() {
        console.log($scope.jobs);
    });
    $scope.toDisplay = function(_id)
    {
        window.location.href = "/jobdisplay?_id="+_id;
    }

    console.log($scope.jobs);
});
