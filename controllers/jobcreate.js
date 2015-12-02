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
        $scope.cancelText = "Delete Job";
        console.log($location.search()._id);

        $scope.master = Job.get({'_id' : $location.search()._id}, function(){
            $scope.master.time = new Date($scope.master.time);
            $scope.master.terms = $scope.master.terms.join(",")
            $scope.reset();
        });
        $scope.submit = function() {
            if($scope.userjob.terms)
                $scope.userjob.terms = $scope.userjob.terms.split(" ").join("").toLowerCase().split(",")
            $scope.userjob.$update()
            console.log("In submit?")
            window.location.href = "/jobdisplay?_id=" + $scope.userjob._id;


        }
        $scope.delete = function()
        {
            $scope.userjob.$delete();
            window.location.href = "/home";
        }

    }
    if($scope.master == null)
    {
        $scope.cancelText = "Cancel";
        var d = new Date().setSeconds(0,0);
        $scope.master = {
            title: "",
            description: "",
            time: new Date(d),
            location: ""
        }
        $scope.reset();
        $scope.submit = function()
        {
            $scope.userjob.terms = $scope.userjob.terms.split(" ").join().toLowerCase().split(",")
            $scope.userjob = Job.save($scope.userjob, function() {
                    window.location.href = "/jobdisplay?_id="+$scope.userjob._id;
            })
            console.log($scope.userjob);
        }
        $scope.delete = function()
        {
            window.location.href = "/home";
        }
    }
});
