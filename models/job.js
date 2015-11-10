var db = require('../database');
var q = require('../serverscripts/postToMailModel')
schema = new db.Schema({
  ownerId:{type: String, required:false},
  modifiable:{type: Boolean, default: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  tags: {type: [String]},
  creationDate: {type: Date, required: false, default: Date.now()},
  wages: {type: Number, required: true},
  time: {type: Date, required: true},
  location: {type: String, required: true},
  signerId: {type: String, required: false},
  paymentNumber: {type: Number, required: false, default: 0},
  applicantSignatureData: {type: [{
    ownerId:{type: String},
    paymentNum:{type: Number, default:0}}], default: []},//Needed to maintain control of payment count by employer.
    //To sign, do a layered search because Job owners can't modify applications.
    // will place actual signing in application model that the employee can modify.
    //Hm. best way to do it? Application model instead of an array. users create them and see them, employer sees them.
    //need new model. maybe have models make modifications upon update? that would resolve these issues.
    //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
    //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    });
schema.post("update", q.jobUpdateMail);
module.exports = db.model("Job", schema);
