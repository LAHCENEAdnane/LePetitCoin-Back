var express = require('express');
var router = express.Router();
const User = require('../models/Users')

/* POST création d'un User */
router.post('/login', function(req, res, next) {

const newUser = new User({
  userName: req.body.userName,
  email: req.body.email,
  password: req.body.password,
  // token
 });
 
 newUser.save().then(() => {
  
  User.find().then(data => {
    console.log(data);
  });
 
 });
});


module.exports = router;
