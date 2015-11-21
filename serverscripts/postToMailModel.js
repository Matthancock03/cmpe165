/**
 * Created by johnfranklin on 10/29/15.
 */



var Mail = require("../models/Mail")
var Applications;
var Jobs;

/*
Must be set up this way. other ways as far as I can think of lead to infinite dependency loops; application and job models both have instances of this class.
 */
module.exports.loadModels = function() {
    var db = require("../database.js");
    try {
        Applications = db.model("Application")//if it's already loaded, it should resolve here.
    }catch(e)
    {
        Applications = require("../models/application")
    }
    try {
        Jobs = db.model("Job")
    }catch(e)
    {
        Jobs = require("../models/job")
    }
}
module.exports.jobUpdateMail = function(job) {
    //Create an email letting people who've applied for a job know when it's updated
    //doc._id//job's id
    console.log("in Job Update Email!");
    Applications.find({jobId: job._id}, function (err, elems) {
        console.log(elems);
        for (var i = 0; i < elems.length; i++) {//for each applicant of the job
            var mail = new Mail();
            mail.ownerId = elems[i].ownerId
            mail.senderId = job.ownerId
            mail.title = "Job '" + job.title + "' has been updated!"
            mail.body = "The job you've applied to has been updated!",
                mail.links = ["/jobdisplay?_id=" + job._id]
            console.log(mail);
            //Manbir's stuff here. make the body of the email. note that all links have to be in the separate link section.
            //job has all the new elements of the job that was updated.
            mail.save();// will send the mail
        }
    })

}

module.exports.acceptedContractMail = function(application) {
    Jobs.findOne({_id: application.jobId}, function (err, job) {
        console.log(job)
        var x = job.applicantSignatureData.map(function (a) {
            return a.ownerId;
        })
        console.log(x)
        if (x.indexOf(application.ownerId) != -1) {//Check to see that the user has been sent the request
            job.modifiable = false;
            var email = new Mail();
            email.ownerId = job.ownerId;//The email to send to. NOT THE EMAIL OF THE SENDER!
            email.senderId = application.ownerId;//email sent from. the id of the sender technically.
            email.links = ["/jobdisplay?_id=" + application.jobId, "/profile?email=" + application.ownerId]
            email.sent = true;
            email.body = "I've accepted your contract! Let's do this.";//the body of the email.
            email.title = "I've accepted your contract!";//the title
            email.save(function (err) {
                if (err)
                    console.log(err);
            });//Don't do this on the frontend. different behavior. would create an object.
            job.save(
                function (err) {
                    if (err)
                        console.log(err);
                }
            );//ditto.
        }
    });
}