let express = require('express');
let router = express.Router();
const Review = require('../models/Review');
const Toilet = require ('../models/Toilet')
const User = require('../models/Users')

router.post('/', (req, res) => {
  const { review, rating, title, userToken, toiletId } = req.body;

  User.findOne({ token: userToken }).then(data => {
    if (data) {
      const newReview = new Review({
        review: review,
        rating: rating,
        title: title,
        users: data._id,
        toilet: toiletId
      });

      newReview.save().then(data => {
        // Renvoyer la réponse avec la nouvelle instance de Review créée
        const reviewId = data._id;
        console.log(reviewId);
        // res.json(data);
      }).catch(error => {
        // En cas d'erreur lors de l'enregistrement de la Review
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la review.' });
      });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' });
  });
});


module.exports = router;
