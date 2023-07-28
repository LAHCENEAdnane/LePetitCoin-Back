var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = new Schema({
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