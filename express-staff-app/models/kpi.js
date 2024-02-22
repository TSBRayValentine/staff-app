'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kpi extends Model {
    static associate(models) {
      kpi.belongsTo(models.kpi_goal,{ foreignKey: 'kpi_goal_id',  onDelete: 'cascade',hooks: true});
      kpi.belongsTo(models.organization, { foreignKey: 'organization_id' });
    }
  };
  kpi.init({
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    error_description: DataTypes.STRING,
    quarter: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'kpi',
    paranoid: false,
    freezeTableName: true,
    
  });
  return kpi;
};