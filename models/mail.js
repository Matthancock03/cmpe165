/**
 * Created by johnfranklin on 10/16/15.
 */
var db = require('../database');
var test = require("../serverscripts/sendMail")
var schema = new db.Schema({
    ownerId:{type: String, required:true},//=recipient, not maker. need to do it this way so users can mark as read.
    body:{type: String},
    title:{type: String},
    senderId:{type: String, required:true},//need this to allow response.
    links:{type:[String]},
    read:{type: Boolean, default:false},
    creationDate: {type: Date, required: false, default: Date.now()}
    //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
    //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})
schema.post('save', test.sendMail);

module.exports = db.model("Mail", schema);
