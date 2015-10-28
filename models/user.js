var db = require('../database')

var User = db.model('User', {
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  customerId: {type: String},
  ownerId: {type: String},
  //This will be email here. ids are made by emails.
  img: { data: Buffer, contentType: String},
  about: {type: String},
  skills: {type: [String]},
  videoLinks: {type: [String]},
//stripeacc: {type: String, required: true},// need something for stripe to transfer money to and from. what do?

  //reviews:{type: db.Schema}                 Not created yet
  //password: {type: String, required: true}, Probably not necessary due to authentication module
  creationDate: {type: Date, required: true, default: Date.now}
})

module.exports = User
