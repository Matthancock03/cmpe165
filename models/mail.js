/**
 * Created by johnfranklin on 10/16/15.
 */
var db = require('../database');
schema = db.model("Mail", {
    ownerId:{type: String, required:true},//=recipient, not maker. need to do it this way so users can mark as read.
    body:{type: String},
    title:{type: String},
    senderId:{type: String, required:true},//need this to allow response.
    links:{type:[String]},
    read:{type: Boolean, default:false},
    creationDate: {type: Date, required: false, default: Date.now()}
    //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
    //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
schema.post('save', function(email) {
    console.log('%s has been saved', email._id);
    email.body;//the body of the email.
    email.title;//the title
    email.ownerId;//The email to send to. NOT THE EMAIL OF THE SENDER!
    email.senderId;//email sent from. the id of the sender technically.
    email.links;//the links of the email. included because angularJS will probably sanitize the information which will remove links or at least the ability for links to function.

    //Manbir's code here. use whatever nodeMail stuff you need here; even if you can't get it working, the document store will still give us enough to work with on our end in the meantime.
});
module.exports