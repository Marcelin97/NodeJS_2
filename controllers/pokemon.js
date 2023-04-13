const { Pokemon } = require("../models");
const pokemons = require("../config/mock.pokemon.js");

// * Import the fileSystem module
const fs = require("fs");

exports.createPokemon = async (req, res, next) => {
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types.join(),
    }).then((datas) => {
      res
        .status(201)
        .json({
          status: 201,
          message: " Pokemons add successfully",
          datas,
        })
        .catch((error) =>
          res.status(500).json({ error: error.name, message: error.message })
        );
    });
  });
};
