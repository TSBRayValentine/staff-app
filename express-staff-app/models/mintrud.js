'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mintrud extends Model {
    static associate(models) {
    }
  };
  mintrud.init({
    organization_id: DataTypes.INTEGER,
    organization_name: DataTypes.TEXT,
    group_category_id: DataTypes.INTEGER,
    group_category_name: DataTypes.TEXT,
    level: DataTypes.INTEGER,

    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p1: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p2: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p3: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p4: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p5: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p6: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p61: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p7: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    p8: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    
   
  }, {
    sequelize,
    modelName: 'mintrud',
    paranoid: true,
  });
  return mintrud;
};