let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: {
    type: String
  },
  text: {
    type: String
  },
  rating: {
    type: Number
  },
  pictures: {
    type: [String]
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