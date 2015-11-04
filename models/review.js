
var db = require('../database');

module.exports =  db.model("Review",{
        ownerId: {type:String},
        reviewer:{type:String, required: true},
        reviewee:{type:String, required: true},
        score:{type:Number, required: true},
        creationDate: {type: Date, required: false, default: Date.now()},
        comment: {type:String}
})
