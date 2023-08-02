let express = require('express');
let router = express.Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {
  try {
    const { review, rating, title, users, toilet } = req.body; // Récupérer les données du corps de la requête

    // Créer une nouvelle instance de Review avec les données reçues
    const newReview = new Review({
      review: review,
      rating: rating,
      title: title,
      users: users,
      toilet: toilet
    });

    const savedReview = await newReview.save(); // Enregistrement de la nouvelle instance de Review
    res.json(savedReview); // Renvoyer la réponse avec la nouvelle instance de Review créée
  } catch (error) {
    // En cas d'erreur lors de l'enregistrement de la Review
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la review.' });
  }
});

module.exports = router;