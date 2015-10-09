var db = require("database");
var Job = db.Schema({
  userID: {type: String, required: true},
  title: {type: String, required: true},
  wage: {type: String, required: true},
  description: {type: String, required: true},
  creationDate: {type: Date, required: false, default: Date.now()},
  wages: {type: Number, required: true},
  time: {type: Date, required: true},
  location: {type: String, required: true}
  //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
  //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

module.exports = db.model("Job", Job);
