const { Pokemon } = require("../models");

// * Import the fileSystem module
// const fs = require("fs");

exports.getAllPokemons = (req, res, next) => {
  Pokemon.findAll({include: {
    all: true,
  }})
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Any pokemons found" });
      }
      res.status(200).json({
        status: 200,
        message: "Pokemons find with success",
        result,
      });
    })
    .catch((error) => {
      res.status(400).json({ error, error: { msg: "Couldn't find post" } });
    });
};

exports.getPokemonByPk = (req, res, next) => {
  Pokemon.findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Pokemon not found" });
      }
      res.status(200).json({
        status: 200,
        message: "Pokemon find with success",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t find pokemon" } });
    });
};

exports.create = (req, res, next) => {
  console.log("DEBUG", req.body)
  Pokemon.create(req.body)
    .then((datas) => {
      res.status(201).json({
        status: 201,
        message: " Pokemon create successfully",
        datas,
      });
    })
    .catch((error) =>
      res.status(500).json({ error: error.name, message: error.message })
    );
};
