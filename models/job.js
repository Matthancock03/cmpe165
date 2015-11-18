var db = require('../database');

module.exports = db.model("Job", {
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
  applicantIdsToSign:{type: [String], default: []}//To sign, do a layered search because Job owners can't modify applications.
  // will place actual signing in application model that the employee can modify.
  //Hm. best way to do it? Application model instead of an array. users create them and see them, employer sees them.
  //need new model
  //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
  //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
