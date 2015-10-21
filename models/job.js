var db = require('../database');

module.exports = db.model("Job", {
  userID: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  tags: {type: [String]},
  creationDate: {type: Date, required: false, default: Date.now()},
  wages: {type: Number, required: true},
  time: {type: Date, required: true},
  location: {type: String, required: true},
  contractSigned: {type: Boolean, default: false},
  signerId: {type: String, required: false}
  //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
  //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
