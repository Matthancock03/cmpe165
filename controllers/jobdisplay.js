angular.module('myApp').controller('jobdisplay', function($scope, $location, Job) {
    if($location.search()._id != null) {
        console.log($location.search()._id);
        $scope.master = Job.get({'_id' : $location.search()._id}, function(){
            $scope.reset();
        });
    }
    $scope.edit = function() {
        window.location.href = "/jobform?_id="+$scope._id
    };
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
        console.log($scope.userjob);
    };
});
