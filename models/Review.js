var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
  review: {
    type: String
  },
  rating: {
    type: Number
  },
  pictures: {
    type: String
  },
  title: {
    type: String
  },
  Users: {
    type: Schema.Types.ObjectId,
    required: true
  },
  Toilet: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = Review;