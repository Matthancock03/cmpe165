var angoose = require("angoose"); /** if angoose is installed as module, then require('angoose')*/
var db = angoose.getMongoose();
var Comment = db.Schema({

})

module.exports = db.model("Comment",Comment);
