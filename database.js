
var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/social';
mongoose.connect(url);
console.log("Connected to MongoDB");
module.exports = mongoose;