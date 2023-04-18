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

exports.getPokemonByPk = (req, res, next) => {
  Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
}

exports.createPokemon = async (req, res, next) => {
  Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}