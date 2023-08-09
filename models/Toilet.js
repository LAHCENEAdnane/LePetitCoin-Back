var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ToiletSchema = new Schema({
  commune: {
    type: String,
  },
  type: {
    type: Boolean
  },
  availability: {
    type: String
  },
  fee: {
    type: Boolean,
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
  point_geo: {lon: Number, lat: Number}
});

const Toilet = mongoose.model('toilets', ToiletSchema);

module.exports = Toilet;