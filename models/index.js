const dbConfig = require("../config/db.config.js");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
let sequelize;
const db = {};
const PokemonModel = require("../models/pokemon.js");
const pokemons = require('../Fixtures/mock.pokemon.js')

sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const Pokemon = PokemonModel(sequelize, Sequelize)

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    console.log("[MySQL] Imported model " + model.name);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    console.log("[MySQL] Imported references of " + modelName);
  }
});

const sequelize_fixtures = require('sequelize-fixtures');

//from file

//=================================>
//* Sync models in DB
//=================================>
// Sync models in DB
sequelize
  .sync({ force: false })
  .then(() => {
    // sequelize_fixtures.loadFile('./fixtures/mock.pokemon.js', Pokemon).then(function(){
    //   // doStuffAfterLoad();
    //   console.log('Complete!');
    // });
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.debug("[MySQL] Synced MySQL schemas");
  })
  .catch((err) => {
    console.error(`"[MySQL] Error syncing schemas! ${err}"`);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
