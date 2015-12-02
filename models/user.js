var db = require('../database')

var User = db.model('User', {
  email: {type: String, required: true, unique: true},
  userName: {type: String},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  customerId: {type: String},
  sellerId: {type: String},
  ownerId: {type: String},//will be the same as email; important to allow modifications of the user table without rewriting functions
  //This will be email here. id = email
  img: {type: String},
  about: {type: String},
  skills: {type: String},
  videoLinks: {type: [String]},
  recieveEmail:{type: Boolean, default: true},
  emailForTags: {type: [String]},
  creationDate: {type: Date, required: true, default: Date.now}
})

module.exports = User
