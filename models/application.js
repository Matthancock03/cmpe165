/**
 * Created by johnfranklin on 10/22/15.
 */
var db = require('../database');
var Job = require("./job")
var Mail = require("./mail")
//A class to allow users to create additions to Jobs without giving them permission to modify. neater this way.
var q = new db.Schema({jobId:{type: String, required:true},
    viewableIds:{type: [String], required:true},
    creationDate: {type: Date, required: false, default: Date.now()},
    //Use this array in any model when you need to limit people who can view things.
    // include other viewers ONLY; don't need and can't easily access own id. ownership assumes viewability anyways
    // if undefined, system will assume anyone can view.
    signed:{type: Boolean, default:false},
    ownerId:{type: String, required:false}//This tag will provide modification limitation; defined on server end.
})


q.post('update', function(application){
    if(application.signed) {
        Job.findOne({_id: application.jobId}, function (job) {
            if (job.applicantSignatureData.map(function(a) {return a.ownerId;}).contains(application.ownerId)) {//Check to see that the user has been sent the request
                job.modifiable = false;
                var email = new Mail();
                email.ownerId = job.ownerId;//The email to send to. NOT THE EMAIL OF THE SENDER!
                email.senderId = application.ownerId;//email sent from. the id of the sender technically.
                email.links = ["/jobdisplay?_id="+application.jobId, "/profile?email=application.ownerId"]
                email.sent = true;
                email.body = "I've accepted your contract! Let's do this.";//the body of the email.
                email.title = "I've accepted your contract!";//the title
                email.save(function(err){
                    if(err)
                        console.log(err);
                });//Don't do this on the frontend. different behavior. would create an object.
                job.save(
                    function(err){
                        if(err)
                            console.log(err);
                    }
                );//ditto.
            }
        });
    }
});//Now all we need is testing
module.exports = db.model("Application", q)
