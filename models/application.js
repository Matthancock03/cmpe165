/**
 * Created by johnfranklin on 10/22/15.
 */
var db = require('../database');

var q = new db.Schema({jobId:{type: String, required:true},
    viewableIds:{type: [String], required:true},
    creationDate: {type: Date, required: false, default: Date.now()},
    //Use this array in any model when you need to limit people who can view things.
    // include other viewers ONLY; don't need and can't easily access own id. ownership assumes viewability anyways
    // if undefined, system will assume anyone can view.
    ownerId:{type: String, required:false}//This tag will provide modification limitation; defined on server end.
})

module.exports = db.model("Application", q)
