require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');

module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USERNAME || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "pokedex",
  PORT: process.env.MYSQL_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Define sequelize config
let host = process.env.MYSQL_HOST || "localhost";
let database = process.env.MYSQL_DATABASE || "pokedex";
let username = process.env.MYSQL_USERNAME || "root";
let password = process.env.MYSQL_PASSWORD || "";
let port = process.env.MYSQL_PORT || 3306;

// Create sequelize instance and configure
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('[MySQL] Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('[MySQL] Unable to connect to the database:', err);
  });