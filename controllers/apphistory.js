angular.module('myApp').controller('appHistory', function($location, $http, $scope, User, Application, Job) {

    $http.get('/currentUser').then(function successCallback(response) {//retrieves the current user.
        console.log("Current User call sucessful!");
        console.log("Email: " + response.data.email);
        if(response.data.email == undefined){
            $scope.loggedIn = false;
        }else{
            $scope.loggedIn = true;
        }
        $scope.user = response.data;
        $scope.pastJobs = Application.query({ ownerId: $scope.user.ownerId},//query requesting all elements where ownerId matches the current user's ownerId

            function(elems,err) {
                console.log(elems);
                $scope.pastJobs = elems;

                $scope.pastJobs.sort(function(a,b){return a.jobId.localeCompare(b.jobId)});
                var jobIdArray = $scope.pastJobs.map(function(a) {return a.jobId;})
                console.log(jobIdArray);

                $scope.jobList = Job.query({
                    //_id: {$in: jobIdArray}
                },
                    function(jobs,err)
                {
                    $scope.jobList = jobs;
                    console.log(jobs);
                    $scope.jobList.sort(function(a,b){return a._id.localeCompare(b._id)})
                    for(var i = 0, k = 0; i < $scope.jobList.length && k < $scope.pastJobs.length;){
                        if($scope.jobList[i]._id != $scope.pastJobs[k].jobId) {//nlogn
                            i++;
                            console.log($scope.jobList[i].title)
                            console.log($scope.jobList[i].ownerId)
                            console.log($scope.jobList[i].time)
                        }
                        else {
                            /*

                             application Date
                             job time
                             */
                            console.log($scope.jobList[i].title)
                            console.log($scope.jobList[i].ownerId)
                            console.log($scope.jobList[i].time)
                            $scope.pastJobs[k].title = $scope.jobList[i].title;
                            $scope.pastJobs[k].email = $scope.jobList[i].ownerId;
                            $scope.pastJobs[k].jobTime = $scope.jobList[i].time;



                            k++;
                        }//Both sorted, so like filtering in values with mergesort(?)



                    }

                })

            });

        $scope.toDisplay = function(job)
        {
            window.location.href = "/jobdisplay?_id="+job._id;
        }

    });


});