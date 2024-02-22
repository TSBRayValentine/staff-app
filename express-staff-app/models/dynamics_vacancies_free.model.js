"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dynamics_vacancies_free extends Model {
    static associate(models) {
    }
  }

  dynamics_vacancies_free.init(
    {
      cnt: DataTypes.INTEGER,
      organization_id: DataTypes.INTEGER,
      organization_name: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
      category_name: DataTypes.TEXT,
      group_id: DataTypes.INTEGER,
      group_name: DataTypes.TEXT,  
      slice_date : DataTypes.DATEONLY
    },
    {
      sequelize,
      modelName: "dynamics_vacancies_free",
      paranoid: false,
      freezeTableName: true,
    }
  );
  return dynamics_vacancies_free;
};
