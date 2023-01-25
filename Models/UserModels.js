const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

class User extends Model {}

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});



( async function(){
    await sequelize.sync();
 console.log("All models were synchronized successfully.");
})();

module.exports = User;