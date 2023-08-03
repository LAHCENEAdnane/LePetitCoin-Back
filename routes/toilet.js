let express = require('express');
let router = express.Router();
const Toilet = require('../models/Toilet');
const { checkBody } = require("../modules/checkBody");


router.post('/', (req, res) => {
    try{
      if (!checkBody(req.body, ["address","type","availability","fee","handicapAccess","coatHanger","changingTable","soap","toiletPaper","cleanliness","feminineHygieneProduct","longitude","latitude"])) {
        res.json({ result: false, error: "Remplissez tous les champs de saisie" });
        return;
      }
  
      const {address, type, availability, fee, handicapAccess, coatHanger, changingTable, soap, toiletPaper, cleanliness, feminineHygieneProduct, longitude, latitude} = req.body;
      
      // Créer une nouvelle instance de Review avec les données reçues
      Toilet.findOne({ address: req.body.address }).then(data => {
        console.log(data);
        if (data === null) {
          const newToilet = new Toilet({
            address,
            // pictures,
            type, 
            availability, 
            fee,
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
              
         newToilet.save().then((data) => {
            console.log(data)
            res.json({ result: true, data});
         }); // Enregistrement de la nouvelle instance de Toilet
        } else {
          res.json({ result: false, error: "toilets already exists" });
        }
      });
    } catch (error) {
      // En cas d'erreur lors de l'enregistrement de la Toilet
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la Toilet.' });
    }
  });
  

/* GET home page. */

router.get('/', async (req, res) => {
  const { latitude, longitude, distance } = req.query;

  try {
    // Call the fetchToiletsNearby function with the provided coordinates
    const nearbyToilets = await fetchToiletsNearby(parseFloat(latitude), parseFloat(longitude));

    // Send the filtered nearbyToilets array as the API response
    res.json({ toilets: nearbyToilets });
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: 'Internal server error' });
  }
  Toilet.find({ commune: { $regex: new RegExp(req.body.commune, "i") } }).limit(20).then(
    (data) => {
      if (data === null) {
        res.json({ result: false, error: "mince, c'est schrodingers coin" });
      } else {
        res.json({ result: true, toilets: data });
      }
      console.log(data);
    }
    );

});
  
router.get('/:id',(req,res) => {
    const toiletId = req.params.id
    Toilet.findOne({ _id: toiletId })
 .then(data => {
   console.log(data);
 });
})

module.exports = router;