var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FunFacts = new Schema({
  pictures: {
    type: String
  },
  title: {
    type: String
  },
  text: {
    type: String
  }
});