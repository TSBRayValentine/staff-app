'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class birthday_bot extends Model {
    static associate(models) {
    }
  };
 
  birthday_bot.init({
    employee_id:     DataTypes.INTEGER,  
    full_name:  DataTypes.TEXT,  
    birth_date:  DataTypes.DATE,  
    email: DataTypes.TEXT,  
    respect: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sex:  DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'birthday_bot',
    paranoid: false,
    freezeTableName: true,
  });
  
  return birthday_bot;
};