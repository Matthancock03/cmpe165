/**
 * Created by johnfranklin on 10/1/15.
 */
(function(){
    var app = angular.module('myApp',[])
    app.controller('jobform', function($scope){
        $scope.getNextJobId = function()
        {
            return 1000;
            //will poll database for new id in future
        }
        function Job(title,location,time,wages,description,terms, id){
            if ( this instanceof Job ) {

                this.title = title;
                this.location = location;//what are we going to do for this? Needs to be set up so that
                // system can gauge distance from the event.
                this.time = time;//what are we going to do for this? needs to be in db format.
                this.wages = wages;
                this.description = description;
                this.terms = terms.split(" ").join("").split(",");
                this.id = id;
            } else {
                return new Job(title, location, time, wages, description, terms);
            }
        }
        $scope.submit = function(s)
        {
            if(s instanceof Job)
            {
                //if id is defined in the db
                    //update the db for that id
                //else add the Job to the DB
            }
        }
        //later define this from database or make blank if no such item in database.
        // define by id in the url to make refresh safe?
        $scope.master = new Job("Is it working?", "", "", "", "", "",0)
        $scope.reset = function() {
            $scope.userjob = angular.copy($scope.master);
        };
        $scope.reset();

        app.toModel();


    });
})();
