function binaryIndexOf(searchElement) {
    'use strict';

    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;
    var resultIndex;

    while (minIndex <= maxIndex) {
        resultIndex = currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = this[currentIndex];

        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }

    return ~maxIndex;
}

Array.prototype.binaryIndexOf = binaryIndexOf;
angular.module('myApp').controller('jobdisplay', function($scope, $location, $http, Job, Application, User, Mail) {
    $scope.applied = true;//disabled until check is applied
    if($location.search()._id != null) {
        console.log($location.search()._id);
        $scope.master = Job.get({'_id' : $location.search()._id}, function(){
            $scope.reset();
            queryApplications();
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
    $scope.quit = function() {
        console.log("Employee Quit " + $scope.user.email);
    };

    $scope.fire = function() {
        console.log("Employee Fired");
    };
    $scope.reset = function() {
        $scope.userjob = angular.copy($scope.master);
        console.log($scope.userjob);
    };
    $scope.apply = function(){
        $scope.applied = true;

        var application = new Application({
            jobId: $scope.master._id,
            viewableIds:[$scope.master.ownerId],
            bid: $scope.userjob.wages
        });
        console.log(application);

        application.$save(application, function() {
            //window.location.href = "/jobs";//need to be careful with these?
            // Is url xss a thing if the contents based on the url are escaped?

            location.reload();
        })

    }
    var queryApplications = function() {
        Application.query({jobId: $location.search()._id}, function (elems, err) {
            $scope.applications = elems;
            $scope.applied = elems.length > 0//Any applications
            $scope.applications.sort(function (a, b) {
                return a.ownerId.localeCompare(b.ownerId)
            });
            User.query({}, function (users, err) {//change to search with in?
                var k = 0;
                var appOwnerIds = $scope.userjob.applicantSignatureData.map(function (a) {
                    return a.ownerId;
                })
                users.sort(function (a, b) {
                    return a.email.localeCompare(b.email)
                })//nlogn
                for (var i = 0; i < users.length && k < $scope.applications.length;) {
                    if ($scope.applications[k].ownerId != users[i].email) {//nlogn
                        i++;
                    }
                    else {
                        var index = appOwnerIds.binaryIndexOf($scope.applications[k].ownerId)
                        console.log(index);
                        console.log($scope.userjob.applicantSignatureData);
                        $scope.applications[k].sent = index >= 0 && $scope.userjob.applicantSignatureData.length > 0//item found O(nlogn)total runtime for n occurances.
                        if ($scope.applications[k].sent)
                            $scope.applications[k].payments = $scope.userjob.applicantSignatureData[index].paymentNum;
                        $scope.applications[k].name = users[i].firstName + " " + users[i].lastName;
                        ;
                        k++;
                    }//Both sorted, so like filtering in values with mergesort(?)
                }
                $scope.loaded = true;
            });


        });
    }
    $scope.loadForFire = function(app)
    {
        $scope.toFire = app;
    }
    $scope.fireLoaded = function(){
        var index = $scope.userjob.applicantSignatureData.map(function(a) {return a.ownerId;}).binaryIndexOf($scope.toFire.ownerId)
        console.log(index);
        if(index < 0) {
            alert("How did you get here?");
        }
        else{
            $scope.userjob.applicantSignatureData.pop(index)//O(n); avoiding n^2 for any one operation is for the best.
            //gonna make this work over sort() because sort isn't as trivial anymore.
            //$scope.userjob.$update();//This part works, need to test other part quickly
            var m = new Mail();
            m.ownerId = $scope.toFire.ownerId;
            m.senderId = $scope.userjob.ownerId;
            m.title = "The Employer of the job '" + $scope.userjob.title + "' has fired you..."
            m.body = "GEEETTTTTTT DUNKED ON!"
            m.links = ["/jobDisplay?_id="+ $scope.userjob._id];
            //app.sent=true;
            m.$save();
            //$scope.toFire.$update();//Don't need to update; information stating them hired was stored in job Object
            //couldn't update anyways; belongs to fired person
        }
    }
    $scope.acceptApplication = function(app){
        //Complete either way.
        var index = $scope.userjob.applicantSignatureData.map(function(a) {return a.ownerId;}).binaryIndexOf(app.ownerId)
        console.log(index);
        if(index <= 0) {
            $scope.userjob.applicantSignatureData.splice(-index, 0, {ownerId: app.ownerId})//O(n); avoiding n^2 for any one operation is for the best.
            //gonna make this work over sort() because sort isn't as trivial anymore.


            //$scope.userjob.$update();//This part works, need to test other part quickly
            var m = new Mail();
            m.ownerId = app.ownerId;
            m.senderId = $scope.userjob.ownerId;
            m.title = "The Employer of the job '" + $scope.userjob.title + "' is sending you a contract!"
            m.body = "Here's a link to your application!"
            m.links = ["/Contract?_id="+ app._id];
            //app.sent=true;
            m.$save();
            $scope.userjob.$update();
            location.reload();
        }
        else{
            alert("How did you get here?");
        }
    }
    $scope.partialDeposit= function(app){
        $http.post("/payments", {_id: app._id, bid: app.bid}).then(function(suc){
            $scope.deposited=true;
        },function(err){
            //???
            alert(err.data);
        })
    }

    //Need to know if you are the applicant or the owner
});
