const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

class User extends Model {};

User.init({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  
module.exports = User;

