var db = require('../database')

var User = db.model('User', {
  //userID: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  img: { data: Buffer, contentType: String},
  about: {type: String},
  skills: {type: String},
  //reviews:{type: db.Schema}                 Not created yet
  //password: {type: String, required: true}, Probably not necessary due to authentication module
  creationDate: {type: Date, required: true, default: Date.now}
})

module.exports = User
