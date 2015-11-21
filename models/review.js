
var db = require('../database');

module.exports =  db.model("Review",{
        ownerId: {type:String},
        //reviewer:{type:String, required: true}, // don't need this. ownerId gi
        reviewee:{type:String, required: true},
        stars:{type:Number, required: true},
        creationDate: {type: Date, required: false, default: Date.now()},
        body: {type:String}
})
