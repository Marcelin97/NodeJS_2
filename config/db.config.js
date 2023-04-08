require("dotenv").config();
  
module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USERNAME || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "pokedex",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
