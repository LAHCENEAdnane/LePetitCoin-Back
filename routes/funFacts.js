let express = require('express');
let router = express.Router();
const FunFact = require('../models/FunFacts');

//   router.get('/', (req, res) => {
// // pourquoi .params déjà ? pour récupérer ce qu'il y aura dans l'url
//     FunFact.findOne( { title : req.body.title, text : req.body.text } )
//     .then(data => {
//       console.log(data);
//       res.json({data});
//     });
//   });
  router.get('/funfact', async (req, res) => {
    try {
        //await est utilisé pour attendre que la requête MongoDB soit terminée avant de continuer, s'utilise avec async
      const funFact = await FunFact.findOne().skip(Math.floor(Math.random() * await FunFact.countDocuments()));
      //.countDocuments, pas obligatoire, exécute une requête MongoDB pour compter le nb total de docs dans la collection FunFact.
     // skip permet de sauter le numéro aléatoire précedemment sorti
      res.json(funFact);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération du fun fact.' });
    }
  });

  
   //FunFact = nom du modèle

module.exports = router;
