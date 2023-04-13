const dbConfig = require("../config/db.config.js");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const db = {};

// Define sequelize config
let host = process.env.MYSQL_HOST || "localhost";
let database = process.env.MYSQL_DATABASE || "pokedex";
let username = process.env.MYSQL_USERNAME || "root";
let password = process.env.MYSQL_PASSWORD || "";
let port = process.env.MYSQL_PORT || 3306;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});


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

// Sync models in DB
sequelize
  .sync({ force: true })
  .then(() => {
    console.debug("[MySQL] Synced MySQL schemas");
  })
  .catch((err) => {
    console.error("[MySQL] Error syncing schemas!");
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
