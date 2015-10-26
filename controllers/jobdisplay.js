angular.module('myApp').controller('jobdisplay', function($scope, $location, $http, Job, Application, User) {
    $scope.applied = false;
    if($location.search()._id != null) {
        console.log($location.search()._id);
        $scope.master = Job.get({'_id' : $location.search()._id}, function(){
            $scope.reset();
            $http.get('/currentUser').then(function(response){
                $scope.user = response.data;
                $scope.notOwner = !($scope.user.email == $scope.userjob.ownerId)//Need to know if you are the applicant or the owner
            }, function errorCallback(response) {
                console.log("Current User error: " + response.error);
            })
        });
    }

    $scope.edit = function() {
        window.location.href = "/create?_id="+$scope.userjob._id
    };
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
        console.log($scope.userjob);
    };
    $scope.apply = function(){
        var application = {
            jobId: $scope.master._id,
            viewableIds:[$scope.master.ownerId]//Use this array in any model when you need to limit people who can view things.
            // include other viewers ONLY; don't need and can't easily access own id for now. ownership implies viewability anyways
            // if undefined, system will assume anyone can view.
        };
        console.log(application);
        Application.save(application, function() {
            //window.location.href = "/jobs";//need to be careful with these?
            // Is url xss a thing if the contents based on the url are escaped?
        })

    }

    Application.query({jobId: $location.search()._id}, function(elems, err) {
        $scope.applications = elems;
        if(elems.length > 0)//Any applications
        {
            $scope.applied = true;
            //Need to know if you are the applicant
        }
        $scope.applications.sort(function(a,b){return a.ownerId.localeCompare(b.ownerId)});
        User.query({}, function(users, err){
            var k = 0;
            users.sort(function(a,b){a.email.localeCompare(b.email)})
            for(var i = 0; i < users.length && k < $scope.applications.length;){
                if($scope.applications[k].ownerId != users[i].email) {
                    i++;
                }
                else {
                    $scope.applications[k].name = users[i].firstName + " " + users[i].lastName;;
                    k++;
                }//Both sorted, so like filtering in values with mergesort(?)
                console.log($scope.applications[k].ownerId)
                console.log(users[i].email)
            }
        });

        //Any better way to do this? This works, but it's not very efficient for cloud use because
        // each query occurs individually and it searches the entire db because it uses query meaning n * a operations on server end
        // Maybe take entire user table and sort and cross reference? Not like users couldn't do it anyways
        //Got it! populate with mongoose. will do later.
        //Won't work easily. no easy way to populate


    });
    $scope.acceptApplication = function(){
        //For now, this is going to instantly deposit payment. We don't have a way to get users to respond to contracts easily due to lack of an inbox.
        //Complete either way.
        window.location.href = "/create?_id="+$scope.userjob._id
    }

    //Need to know if you are the applicant or the owner
});
