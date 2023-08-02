let express = require('express');
let router = express.Router();
const Toilet = require('../models/Toilet');

router.post('/', async (req, res) => {
  try {
    const {address, pictures, type, availability, handicapAccess, coatHanger, changingTable, soap,toiletPaper,cleanliness, feminineHygieneProduct, longitude, latitude} = req.body
    // Créer une nouvelle instance de Review avec les données reçues
    const newToilet = new Toilet({
        address,
        // pictures,
        type, 
        availability, 
        handicapAccess, 
        coatHanger, 
        changingTable, 
        soap,
        toiletPaper,
        cleanliness, 
        feminineHygieneProduct, 
        longitude, 
        latitude
    });

    const savedToilet = await newToilet.save(); // Enregistrement de la nouvelle instance de Toilet
    res.json(savedToilet); // Renvoyer la réponse avec la nouvelle instance de Toilet créée
  } catch (error) {
    // En cas d'erreur lors de l'enregistrement de la Toilet
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la Toilet.' });
  }
});



router.get('/:toilet',(req,res) => {
    const toiletId = req.params.id
    Toilet.findOne({ id: toiletId })
 .then(data => {
   console.log(data);
 });
})

module.exports = router;