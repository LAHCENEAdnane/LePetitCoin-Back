var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
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
  users: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users' ,
  },
  toilet: {
    type: mongoose.Schema.Types.ObjectId, ref: 'toilets' ,
  }
});

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = Review;