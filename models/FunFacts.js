var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FunFactsSchema = new Schema({
  // pictures: {
  //   type: String
  // },
  title: {
    type: String
    
  },
  text: {
    type: String
  }
});

const funFact = mongoose.model('funFacts', FunFactsSchema);

module.exports = funFact;