let express = require('express');
let router = express.Router();
const Review = require('../models/review');
const User = require('../models/Users')
const Toilette = require('../models/Toilet');

router.post('/:token', (req, res) => {

  const {token} = req.params
  const { text, rating, title, toiletId } = req.body;

  User.findOne({ token }).then(data => {
    // console.log('data',data)
    if (data) {
      const newReview = new Review({
        title: title,
        rating: rating,
        text: text,
        user: data._id,
        toilet: toiletId
      });

      newReview.save().then(data => {
        // Renvoyer la réponse avec la nouvelle instance de Review créée
        const reviewId = data._id;
        console.log(reviewId);
        // res.json(data);
      })
      .catch(error => {
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


router.put('/:token',(req,res) => {

  const {token} = req.params;
  const { review, rating, title, toiletId } = req.body;
  
  User.findOne({ token }).then(data => {
    if (data) {
      // Vérifiez que l'utilisateur a bien créé l'avis que vous essayez de mettre à jour
      Review.findOne({ user: data._id }).then(data => {
        if (data) {
          // Mettez à jour les champs de l'avis
          data.title = title;
          data.rating = rating;
          data.review = review;
          
          // Enregistrez les modifications dans la base de données
          data.save().then(updatedReview => {
            res.json(updatedReview);
          }).catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'avis.' });
          });
        } else {
          res.status(404).json({ error: 'Avis non trouvé ou vous n\'avez pas l\'autorisation de le modifier.' });
        }
      }).catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la recherche de l\'avis.' });
      });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche de l\'utilisateur.' });
  });
})

// router.post('/upload', async (req, res) => {
//   const formData = new FormData();
//   const uniqid = require('uniqid');
//   const cloudinary = require('cloudinary').v2;
//   const fs = require('fs');
//   const photoPath = `./tmp/${uniqid()}.jpg`;
//   const resultMove = await req.files.photoFromFront.mv(photoPath);
  
  
//   if (!resultMove) {
//       const resultCloudinary = await cloudinary.uploader.upload(photoPath);
//       fs.unlinkSync(photoPath);
//       res.json({ result: true, url: resultCloudinary.secure_url }); 
//   } else {
//     res.json({ result: false, error: resultMove });
//   }
// });
router.get('/:toiletteId', async (req, res) => {
  const toiletteId = req.params.toiletteId;

  try {
    // Trouver la toilette par ID
    const toilette = await Toilette.findById(toiletteId);

    if (!toilette) {
      return res.status(404).json({ message: 'Toilette not found' });
    }

    // Trouver toutes les revues (reviews) associées à cette toilette
    const reviews = await Review.find({ toilet: toiletteId }).populate('user',["userName"]);
    if (!reviews) {
      return res.status(404).json({ error: 'reviews not found' });
    }
    
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
 

module.exports = router;
