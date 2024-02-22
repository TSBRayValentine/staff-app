'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kpi_goal extends Model {
    static associate(models) {
    kpi_goal.hasMany(models.kpi, { foreignKey: 'kpi_goal_id',  onDelete: 'cascade', hooks: true });
    }
  };
  kpi_goal.init({
    goal: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'kpi_goal',
    paranoid: false,
  });
  return kpi_goal;
};

