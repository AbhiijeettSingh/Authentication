const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mydb', 'root', 'db@842799', {
  host: './config/test-db.sqlite',
  dialect:'sqlite'
});

module.exports = sequelize;