/**
 * Created by johnfranklin on 10/28/15.
 */
/**
 * Created by johnfranklin on 10/28/15.
 */
var q = {};
var nodemailer = require('nodemailer');
var User = require('../models/user');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'stagehandinfo@gmail.com',
        pass: 'vegeta11'
    }
});//any way to define this globally?
/**
 * Use this to send mail instead of ManbirMail.
 * includes check if the user wants to receive email notifications and if the user exists, which is important.
 * @param email mail doc from model middleware call
 */
q.sendMail = function(email)
{
    User.findOne({email: email.ownerId}, function(err, user){//err is always first as in error scenarios it would have to send null for the first argument instead of just sending the error.
        if(user == null || (user.recieveEmail != null && !user.recieveEmail))
            return;
        q.manbirMail(email)
    })
}

q.manbirMail = function(email) {
    //Need to make sure that user is OK with emails.
    //Also should probably make sure user exists. don't want our email service to be used for spam.

    //console.log('%s has been saved', email._id);
    //hm. problem. what if they use a local link?
    //won't go to the same place that it would from the website.
    //Manbir's code here. use whatever nodeMail stuff you need here; even if you can't get it working, the document store will still give us enough to work with on our end in the meantime.
    /*var htmltext = "";
    for(var i = 0; i < email.links.length; i++)
        htmltext += "<a href='"+ email.links[i]+"'>"+email.links[i] + "</a>\n";*/
    var plaintext = "";
    var q;
    for(var i = 0; i < email.links.length; i++) {
        console.log(q);
        if (email.links[i].length >= 7 && ((q = email.links[i].substr(0, 7)) == "https:/" || q == "http://" || q == "localho")){
            plaintext += "\n" + email.links[i];}
        else {
            if(email.links[i] == "" || email.links[i].charAt(0) != "/")
                plaintext += "\nhttps://cmpe165-server.herokuapp.com/" + email.links[i];
            else
                plaintext += "\nhttps://cmpe165-server.herokuapp.com" + email.links[i];
        }
    }


// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'stagehandinfo <stagehandinfo@gmail.com>', // sender address has to be same as authentication email
        to: email.ownerId, // list of receivers
        subject: "'" + email.title + "' from " + email.senderId, // Subject line
        text: email.body + "\n" + plaintext, // plaintext body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}
module.exports = q;