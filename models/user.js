var db = require('../database')

var User = db.model('User', {
  email: {type: String, required: true, unique: true},
  userName: {type: String},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  customerId: {type: String},
  ownerId: {type: String},//will be the same as email; important to allow modifications of the user table without rewriting functions
  //This will be email here. id = email
  img: { data: Buffer, contentType: String},
  about: {type: String},
  skills: {type: String},
  videoLinks: {type: String},
  //stripeacc: {type: String, required: true},// need something for stripe to transfer money to and from. what do?
  //reviews:{type: db.Schema}                 Not created yet
  creationDate: {type: Date, required: true, default: Date.now}
})

module.exports = User
