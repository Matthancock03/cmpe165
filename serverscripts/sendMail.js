/**
 * Created by johnfranklin on 10/28/15.
 */
/**
 * Created by johnfranklin on 10/28/15.
 */
var q = {};
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'stagehandinfo@gmail.com',
        pass: 'vegeta11'
    }
});//any way to define this globally?
q.manbirMail = function(email) {


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
        subject: "'" + email.title + "' from" + email.senderId, // Subject line
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