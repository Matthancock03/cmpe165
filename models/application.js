/**
 * Created by johnfranklin on 10/22/15.
 */
var db = require('../database');
//A class to allow users to create additions to Jobs without giving them permission to modify. neater this way.
<<<<<<< HEAD
module.exports = db.model("Application", {jobId:{type: db.Schema.ObjectId, required:true},
=======
var q = new db.Schema({jobId:{type: String, required:true},
>>>>>>> 537d0aea0a119e801a5be1c2eb1cb32d5ca41c8b
    viewableIds:{type: [String], required:true},
    creationDate: {type: Date, required: false, default: Date.now()},
    //Use this array in any model when you need to limit people who can view things.
    // include other viewers ONLY; don't need and can't easily access own id. ownership assumes viewability anyways
    // if undefined, system will assume anyone can view.
    ownerId:{type: String, required:false}//This tag will provide modification limitation; defined on server end.
})

module.exports = db.model("Application", q)