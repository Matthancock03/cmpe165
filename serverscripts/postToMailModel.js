/**
 * Created by johnfranklin on 10/29/15.
 */
var Mail = require("../models/mail");
var Applications = require("../models/application");
module.exports.jobUpdateMail = function(job){
    //Create an email letting people who've applied for a job know when it's updated
    //doc._id//job's id
    var applicants = Applications.find({jobId:job._id},function(elem, err){
        for(var i = 0; i < applicants.length; i++) {//for each applicant of the job
            var mail = new Mail();
            mail.ownerId = applicants[i].ownerId
            mail.senderId = job.ownerId
            mail.title = "Job '"+ job.title + "' has been updated!"
            mail.body = "The job you've applied to has been updated!",
            mail.links=["/jobdisplay?_id="+job._id]
            //Manbir's stuff here. make the body of the email. note that all links have to be in the separate link section.
            //job has all the new elements of the job that was updated.
            mail.save();// will send the mail
        }
    })

}

