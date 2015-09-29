var db = require('../database')

var Job = db.model('Job', {
  userID: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  creationDate: {type: Date, required: true, default: Date.now},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

module.exports = Job
