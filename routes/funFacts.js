let express = require('express');
let router = express.Router();
const funFact = require('../models/funFacts');
const cloudinary = require('cloudinary').v2;
const { env } = require('process');
const fs = require('fs');

// router.get('/', async (req, res) => {
//   try {
//     const allFunFacts = await funFact.find({});
//     res.json({ data: allFunFacts });
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur lors de la récupération des fun facts.' });
//   }
// });

  router.get('/', async (req, res) => {
    try {
      // await pour attendre que la requête MongoDB soit récupérée, soit un funFact de la collection
      //Math.random pour obtenir un nombre aléatoire entre 0 et 1
      //Math floor pour arrondir le numéro
      //countDocuments = nombre total de doc dans la collection
      //.skip() = pour que le nouveau doc aléatoire ne soit pas le même que l'actuel, à chaque appel
      const FunFact = await funFact.findOne().skip(Math.floor(Math.random() * await funFact.countDocuments()));
      console.log("try ok")
      
      //res.json de FunFact car récupère le résultat de la constante
      res.json(FunFact);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération du fun fact.' });
    }
  })
   
    //FunFact = nom du modèle et nom constante

module.exports = router;
