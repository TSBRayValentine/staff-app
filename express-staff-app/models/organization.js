'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organization extends Model {
    static associate(models) {
      organization.hasMany(models.employee, { foreignKey: 'organization_id' });
      organization.hasMany(models.kpi, { foreignKey: 'organization_id' });
    }
  };
  organization.init({
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'organization',
    paranoid: true,
  });
  return organization;
};