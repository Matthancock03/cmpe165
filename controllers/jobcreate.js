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
        $scope.master = Job.get({'_id' : $location.search()._id}, function(){
            $scope.master.time = new Date($scope.master.time);
            $scope.reset();
        });
        $scope.submit = function() {
            if ($scope.userjob.signature == null) {
                $scope.userjob.$update()
                window.location.href = "/jobdisplay?_id=" + $scope.userjob._id;
            }
            else
            {
                alert("Contract has been signed");
            }


        }
    }
    if($scope.master == null)
    {
        var d = new Date().setSeconds(0,0);
        $scope.master = {
            userID: "???",//What are we doing for this?
            title: "",
            description: "",
            time: new Date(d),
            location: ""
        }
        $scope.reset();
        $scope.submit = function()
        {
            $scope.userjob = Job.save($scope.userjob, function() {
                    window.location.href = "/jobdisplay?_id="+$scope.userjob._id;
            })
            console.log($scope.userjob);
        }
    }





});
