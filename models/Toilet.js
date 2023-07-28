var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Toilet = new Schema({
  address: {
    type: String
  },
  pictures: {
    type: String
  },
  type: {
    type: String
  },
  availability: {
    type: String
  },
  handicapAccess: {
    type: Boolean
  },
  coatHanger: {
    type: Boolean
  },
  changingTable: {
    type: Boolean
  },
  soap: {
    type: Boolean
  },
  toiletPaper: {
    type: Boolean
  },
  cleanliness: {
    type: Boolean
  },
  feminineHygieneProduct: {
    type: Boolean
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
});