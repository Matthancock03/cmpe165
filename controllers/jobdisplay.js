angular.module('myApp').controller('jobdisplay', function($scope, $location, Job, Application, User) {
    if($location.search()._id != null) {
        console.log($location.search()._id);
        $scope.master = Job.get({'_id' : $location.search()._id}, function(){
            $scope.reset();
        });
    }
    $scope.edit = function() {
        window.location.href = "/create?_id="+$scope._id
    };
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
        console.log($scope.userjob);
    };
    $scope.apply = function(){
        var application = {
            jobID: $scope.master._id,
            viewableIds:[$scope.master.ownerId]//Use this array in any model when you need to limit people who can view things.
            // include other viewers ONLY; don't need and can't easily access own id. ownership implies viewability anyways
            // if undefined, system will assume anyone can view.
        };
        console.log(application);
        Application.save(application, function() {
            //window.location.href = "/jobs";
        })

    }
    $scope.applications = Application.query({jobId: $scope.master._id}, function() {
        for(var i = 0; i < $scope.applications.length; i++)
        {
            User.query({email: $scope.applications[i].ownerId}, function(users, user){
                $scope.applications[i].name = users[0].firstName + " " + users[0].lastName;
                console.log(users.length);
            });//Any better way to do this? This works, but it's not very efficient for cloud use because
        // each query occurs individually and it searches the entire db because it uses query meaning n * a operations on server end
        // Maybe take entire user table and sort and cross reference? Not like users couldn't do it anyways
        }

    });
    $scope.appText = "";
    if(applications.length > 0)//Any applications
        $scope.appText = "Viewable Applications"
});
