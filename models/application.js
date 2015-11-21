/**
 * Created by johnfranklin on 10/22/15.
 */
var db = require('../database');

//A class to allow users to create additions to Jobs without giving them permission to modify. neater this way.
var q = new db.Schema({jobId:{type: String, required:true},
    viewableIds:{type: [String], required:true},
    //Use this array in any model when you need to limit people who can view things.
    // include other viewers ONLY; don't need and can't easily access own id. ownership assumes viewability anyways
    // if undefined, system will assume anyone can view.
    creationDate: {type: Date, required: false, default: Date.now()},
    bid:{type: Number, required: true},

    signed:{type: Boolean, default:false},
    ownerId:{type: String, required:false}//This tag will provide modification limitation; defined on server end.
})

var q2 = require('../serverscripts/postToMailModel')
q.post('save', q2.acceptedContractMail);//Now all we need is testing
module.exports = db.model("Application", q)
q2.loadModels();