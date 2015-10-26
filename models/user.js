var db = require('../database')

var User = db.model('User', {
  ownerId:{type: String, required: false},//will be the same as _id; important to allow modifications of the user table without rewriting functions
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String},
  email: {type: String, required: true, unique: true},
  img: { data: Buffer, contentType: String},
  about: {type: String},
  skills: {type: [String]},
  videoLinks: {type: [String]},
  //reviews:{type: db.Schema}                 Not created yet
  //password: {type: String, required: true}, Probably not necessary due to authentication module
  creationDate: {type: Date, required: true, default: Date.now}
})

module.exports = User
