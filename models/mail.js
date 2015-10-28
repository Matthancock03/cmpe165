/**
 * Created by johnfranklin on 10/16/15.
 */
var db = require('../database');
module.exports = db.model("Mail", {
    ownerId:{type: String},//=recipient, not maker. need to do it this way so users can mark as read.
    body:{type: String},
    title:{type: String},
    senderId:{type: String},//need this to allow response.
    links:{type:[String]}
    read:{type: Boolean, default:false},
    creationDate: {type: Date, required: false, default: Date.now()}
    //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
    //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});