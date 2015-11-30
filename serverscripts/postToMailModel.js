/**
 * Created by johnfranklin on 10/29/15.
 */



var Mail = require("../models/mail")
var Applications;
var Jobs;
var Users;

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
    try {
        Users = db.model("User")
    }catch(e)
    {
        Users = require("../models/user")
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
            mail.body = "The job you've applied to has been updated. Check the link:"
            mail.links = ["/jobdisplay?_id=" + job._id]
            console.log(mail);
            //Manbir's stuff here. make the body of the email. note that all links have to be in the separate link section.
            //job has all the new elements of the job that was updated.
            mail.save();// will send the mail
        }
        if(elems.length == 0 && job.terms)//treat updates without applicants as new jobs, terms defined.
        {
            Users.find({emailForTags: {$in: job.terms}}, function(err, users){
                for (var i = 0; i < users.length; i++) {//for each person with interest in this type of job
                    var mail = new Mail();
                    mail.ownerId = users[i].ownerId
                    mail.senderId = job.ownerId
                    mail.title = "Considered this job? '" + job.title + "'"
                    mail.body = "A job's been posted that looks right up your alley.\n"+
                        "Title: "+ job.title +"\n Description: " + job.description +
                        "\nLocation: " + job.location+"\n More information in the link below!"
                    mail.links = ["/jobdisplay?_id=" + job._id]
                    console.log(mail);

                    mail.save();// will send the mail
                }
            })
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
