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


//Sign in, if user has an account
router.post('/signin', (req, res) => {

  //check if all inputs are filled
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
//find user in DB if they exist
  User.findOne({ username: req.body.username }).then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});

module.exports = router;
