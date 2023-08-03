var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  title: {
    type: String
  },
  review: {
    type: String
  },
  rating: {
    type: Number
  },
  // pictures: {
  //   type: String
  // },
  title: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users' ,
  },
  toilet: {
    type: mongoose.Schema.Types.ObjectId, ref: 'toilets' ,
  }
});

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = Review;