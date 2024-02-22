"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
  }
  employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      birth_date: {
        type: DataTypes.DATE,
      },
      phone_personal: {
        type: DataTypes.INTEGER,
      },
      phone_work: {
        type: DataTypes.INTEGER,
      },

      sex: {
        type: DataTypes.TEXT,
      },
      organization_id: {
        type: DataTypes.INTEGER,
      },
    },

    {
      sequelize,
      modelName: "employee",
      paranoid: true,
      freezeTableName: true,
    }
  );
  return employee;
};
