angular.module('myApp').controller('jobHistory', function($location, $http, $scope, User, Application, Job) {

    $http.get('/currentUser').then(function successCallback(response) {
        console.log("Current User call sucessful: ");
        console.log("Email: " + response.data.email);
        if(response.data.email == undefined){
            $scope.loggedIn = false;
        }else{
            $scope.loggedIn = true;
        }
        $scope.user = response.data;
        $scope.pastJobs = Application.query({ ownerId: $scope.user.ownerId},

            function(elems,err) {
                console.log(elems);
                $scope.pastJobs = elems;

                $scope.pastJobs.sort(function(a,b){return a.jobId.localeCompare(b.jobId)});
                var jobIdArray = $scope.pastJobs.map(function(a) {return a.jobId;})
                console.log("Job Id Array");
                console.log(jobIdArray);
///////////////////
                $scope.jobList = Job.query({
                    },
                    function(jobs,err)
                    {
                        $scope.jobList = jobs;
                        console.log("Jobs: ");
                        console.log(jobs);
                        $scope.jobList.sort(function(a,b){return a._id.localeCompare(b._id)})
                        for(var i = 0, k = 0; i < $scope.jobList.length && k < $scope.pastJobs.length;){
                            if($scope.jobList[i].ownerId != response.data.email) {

                                console.log("***ID did not match***");
                                console.log($scope.jobList[i].title)
                                console.log($scope.jobList[i].ownerId)
                                console.log($scope.jobList[i].time)
                                i++;
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
                            }



                        }
                    })
///////////////////////

            });


    });


});

