<<<<<<< Updated upstream
var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/social';
mongoose.connect(url);
console.log("Connected to MongoDB");
=======
>>>>>>> Stashed changes

var a = require('angoose');
mongoose = a.getMongoose();
module.exports = mongoose;
