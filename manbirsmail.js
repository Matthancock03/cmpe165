/**
 * Created by johnfranklin on 10/28/15.
 */
var q = {};
q.manbirMail = function(email) {


    //console.log('%s has been saved', email._id);
    email.body;//the body of the email.
    email.title;//the title
    email.ownerId;//The email to send to. NOT THE EMAIL OF THE SENDER!
    email.senderId;//email sent from. the id of the sender technically.
    email.links;//the links of the email. included because angularJS will probably sanitize the information which will remove links or at least the ability for links to function.

    //Manbir's code here. use whatever nodeMail stuff you need here; even if you can't get it working, the document store will still give us enough to work with on our end in the meantime.
}
module.exports = q;