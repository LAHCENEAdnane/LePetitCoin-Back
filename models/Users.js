var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  userName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  }
});


const User = mongoose.model('users', userSchema);

module.exports = User;