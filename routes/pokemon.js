const express = require("express");
const router = express.Router();

// * Post controller
const pokemonsCtrl = require("../controllers/pokemon.js");

//=================================>
// * CREATE A POST
//=================================>
router.post("/addAll", pokemonsCtrl.createPokemon);

module.exports = router;
