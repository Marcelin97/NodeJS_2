const { Pokemon } = require("../models");

// * Import the fileSystem module
// const fs = require("fs");

exports.createPokemon = async (req, res, next) => {

};

exports.getAllPokemons = (req, res, next) => {
  Pokemon.findAll().then(
    (pokemons) => {
      res.status(200).json(pokemons);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};