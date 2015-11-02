
var db = require('../database');
module.exports =  db.model("Comment",{
        ownerId: {type:String},
        creationDate: {type: Date, required: false, default: Date.now()},
        text: String
})
