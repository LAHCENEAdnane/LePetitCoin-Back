let express = require('express');
let router = express.Router();
const User = require('../models/Users')

const uid2 = require('uid2');
const bcrypt = require('bcrypt');
// recupére la fonction checkbody
const { checkBody } = require('../modules/checkBody');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* POST création d'un User */
router.post('/signup', function(req, res, next) {
  // hash le mdp
  const hash = bcrypt.hashSync(req.body.password, 10);
  // si checkBody(req.body.userName, req.body.password) sont false return error
  if (!checkBody(req.body, ['userName', 'password'])) {
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
     // si le regex est vrai sauvegarde de l'user sinon return
     if(EMAIL_REGEX.test(req.body.email)){
       // sauvegarde l'user a la bdd
       newUser.save().then((data) => {
         //si il n'existe pas le créer et return true avec le token affilier
         console.log(data)
         res.json({ result: true, token: data.token, username: data.userName });
        });
      }
      }else{
      //sinon return false
      res.json({ result: false, error: "user already exists" });
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
