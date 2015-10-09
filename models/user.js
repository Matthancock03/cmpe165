/**
 * Created by johnfranklin on 10/7/15.
 */
var angoose = require("angoose"); /** if angoose is installed as module, then require('angoose')*/
var db = angoose.getMongoose();
var User = db.Schema({

    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
    //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
module.exports = db.model("User", User);