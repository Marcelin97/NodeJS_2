const express = require("express");
const router = express.Router();

// * Pokemon controller
const pokemonsCtrl = require("../controllers/pokemon.js");

//=================================>
// * CREATE A POST
//=================================>
router.post("/", pokemonsCtrl.create);
router.get('/', pokemonsCtrl.getAllPokemons);
router.get('/:id', pokemonsCtrl.getPokemonByPk);

module.exports = router;
