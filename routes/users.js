let express = require('express');
let router = express.Router();
const User = require('../models/Users')

const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const { checkBody } = require('../modules/checkBody');


/* POST création d'un User */
router.post('/signup', function(req, res, next) {
  // hash le mdp
  const hash = bcrypt.hashSync(req.body.password, 10);

  if (!checkBody(req.body, ['userame', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
  // recherche dans la bdd selon l'userName
  User.findOne({ userName: req.body.userName }).then(data => {
    //si il n'existe pas 
    if(data === null){
    // créer un nouvelle utilisateurs
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      token : uid2(32),
     });
     // sauvegarde l'user a la bdd
     newUser.save().then((data) => {
      //si il n'existe pas le créer et return true avec le token affilier
       res.json({ result: true, token: data.token });
      });
    }else{
      //sinon return false
      res.json({ result: false,error: "user already exists" });
    }
  });
});


//Sign in, if user has an account
router.post('/signin', (req, res) => {

  //check if all inputs are filled
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
//find user in DB if they exist
  User.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
      console.log(data)
    } else {
      res.json({ result: false, error: 'User not found' });
      // console.log(data)
    }
  });
});

module.exports = router;
