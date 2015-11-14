/**
 * Created by johnfranklin on 11/3/15.
 */
angular.module('myApp').controller('Contract', function($location, $http, Application){
    console.log("alive");
    if($location.search()._id != null) {
        this.application = Application.get({_id: $location.search()._id},function(application, err)
        {
            console.log(this.application);
        })
        this.submit = function()
        {
            this.application.signed = true;
            this.application.$update();
            console.log(this.application);
            window.location.href="/jobdisplay?_id="+this.application.jobId;

        }
    }


});