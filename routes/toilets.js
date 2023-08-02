var express = require("express");
var router = express.Router();
const Toilet = require("../models/Toilet");

const { checkBody } = require("../modules/checkBody");

/* GET home page. */
router.get("/", (req, res) => {
  if (!checkBody(req.body, ["commune"])) {
    res.json({ result: false, error: "taper une ville" });
    return;
  }
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

module.exports = router;
