const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('test-db', 'user', 'pass', {
  dialect: process.env.DIALECT_DB,
  host: process.env.HOST_DB
})

module.exports = sequelize;