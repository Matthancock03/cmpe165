/**
 * Created by johnfranklin on 11/3/15.
 */
angular.module('myApp').controller('Contract', function($location, $http, Application){

    if($location.search()._id != null) {
        this.application = Application.findOne({_id: $location.search()._id},function(application)
        {
            this.submit = function()
            {
                this.application.signed = true;
                this.application.$update();
                //window.location.href="/jobdisplay?_id="+application.jobId;
            }

        })

    }


});