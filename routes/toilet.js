let express = require("express");
let router = express.Router();
const Toilet = require("../models/Toilet");
const { checkBody } = require("../modules/checkBody");


router.post('/', (req, res) => {
    try{
    // if (!checkBody(req.body, ["availability","commune", "point_geo.lon", "point_geo.lat"])) 
    // {
    //     res.json({ result: false, error: "Remplissez tous les champs de saisie" });
    //     return;
    //   }
  
      const {commune, type, availability, fee, handicapAccess, coatHanger, changingTable, soap, toiletPaper, cleanliness, feminineHygieneProduct, lon, lat} = req.body;
      
      // Créer une nouvelle instance de Review avec les données reçues
      Toilet.findOne({ point_geo : req.body.lon, lat: req.body.lat }).then(data => {
        console.log(data);
        if (data === null) {
          const newToilet = new Toilet({
            commune,
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
            point_geo: {
              lon, 
              lat
            }
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
router.get("/", (req, res) => {
//   if (!checkBody(req.body, ["commune"])) {
//     res.json({ result: false, error: "taper une ville" });
//     return;
//   }
  Toilet.find({ commune: { $regex: new RegExp(req.body.commune, "i") } }).then(
    (data) => {
      if (data === null) {
        res.json({ result: false, error: "mince, c'est schrodingers coin" });
      } else {
        res.json({ result: true, toilets: data });
      }
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching toilets:", error);
      res.status(500).json({ result: false, error: "An error occurred while fetching toilets" });
    }
  );
});

router.post("/recherche", (req, res) => {
  Toilet.find({ commune: { $regex: new RegExp(req.body.commune, "i") } })
    .then((data) => {
      res.json({ result: true, toilets: data });
      console.log(data);
    })
    .catch((error) => {
      res.json({ result: false, error: "Error fetching toilets" });
      console.error("Error fetching toilets:", error);
    });
});

router.get("/map", async (req, res) => {
  // const { latitude, longitude } = req.query;

  Toilet.find({ commune: { $regex: new RegExp(req.body.commune, "i") } }).then(
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
  console.log("hey ho", toiletId)
    Toilet.findOne({_id:toiletId})
 .then(data => {
  res.json({ result: true, toilets: data });

 });
})
 

module.exports = router;
