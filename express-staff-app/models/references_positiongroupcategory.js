"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class references_positiongroupcategory extends Model {

  }
  references_positiongroupcategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "references_positiongroupcategory",
      paranoid: true,
      freezeTableName: true,
    }
  );
  return references_positiongroupcategory;
};
