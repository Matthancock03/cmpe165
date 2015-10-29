angular.module('myApp').controller('jobdisplay', function($scope, $location, $http, Job, Application, User, Mail) {
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
        User.query({}, function(users, err){//change to search with in?
            var k = 0;
            users.sort(function(a,b){a.email.localeCompare(b.email)})//nlogn
            for(var i = 0; i < users.length && k < $scope.applications.length;){
                if($scope.applications[k].ownerId != users[i].email) {//nlogn
                    i++;
                }
                else {
                    applications[k].sent = userjob.applicantIdsToSign.binaryIndexOf(applications[k].ownerId) >= 0//item found O(nlogn)total runtime for n occurances.
                    $scope.applications[k].name = users[i].firstName + " " + users[i].lastName;;
                    k++;
                }//Both sorted, so like filtering in values with mergesort(?)
                console.log($scope.applications[k].ownerId)
                console.log(users[i].email)
            }
        });


    });
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
    $scope.acceptApplication = function(app){
        //Complete either way.
        index = userjob.applicantIdsToSign.binaryIndexOf(app.ownerId)
        if(index < 0) {
            //userjob.applicantIdsToSign.splice(-index, 0, app.ownerId)//O(n); avoiding n^2 for any one operation is for the best.
            userjob.applicantIdsToSign.push(app.ownerId);//doing this for now because not sure about negative index
            userjob.applicantIdsToSign.sort();

            userjob.update();
            var m = new Mail();
            m.ownerId = app.ownerId;
            m.senderId = userjob.ownerId;
            m.body = "Here's a link to your application!"
            m.links = ["/Contract?_id="+userjob._id];
            app.sent=true;
        }
        else{
            alert("How did you get here?");
        }
    }

    //Need to know if you are the applicant or the owner
});
