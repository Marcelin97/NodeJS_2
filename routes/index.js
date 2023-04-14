const express = require("express");
const router = express.Router();

// protect against HTTP Parameter Pollution attacks
const hpp = require('hpp');

// Protect against HPP, should come before any routes
router.use(hpp());

// * Middlewares secure
// const rateLimiter = require("../middleware/rateLimiter");
// const slowDown = require("../middleware/speedLimiter");

// * All routes
router.get("/", (req, res) => {
    res.json("Pokedex API 1.0.0");
  });
  
const pokemonRoutes = require("./pokemon");

// * on applique nos routes à notre router
router.use("/pokemons", pokemonRoutes);

module.exports = router;