const db = require("../models");

const { QueryTypes } = require("sequelize");
const Organization = db.organization;

exports.organizationsForRegister = async (req, res) => {
  try {
    const organizations = await Organization.findAll({
      attributes: ["id", "name"],

      where: {
        type_id: 1,
      },
    });

    res.json(organizations);
  } catch (e) {

    res
      .status(500)
      .json({
        message: "Что-то пошло не так, попробуйте снова",
        type: "danger",
      });
  }
};

exports.show = async (req, res) => {
  try {
    const organizations = await Organization.findAll({
      attributes: ["id", "name"],
      where: { type_id: 1 },
      order: [["name", "ASC"]],
    });
    res.json(organizations);
  } catch (e) {
    
    res
      .status(500)
      .json({
        message: "Что-то пошло не так, попробуйте снова",
        type: "danger",
      });
  }
};

exports.showOrganizations = async (req, res) => {
  try {
    let message = "";
  
    const result = await db.sequelize.query('select * from organizations', {
          type: QueryTypes.SELECT,
    });

    res.json({
      data: result,
      total: result.length,
      message: message,
      type: "info",
    });
  } catch (e) {

    res
      .status(500)
      .json({
        message: "Что-то пошло не так, попробуйте снова",
        type: "danger",
      });
  }
};
exports.showOrganizationsKtr = async (req, res) => {
  try {
    let message = "";
    let result = [];

    result = await Organization.findAll({
      attributes: ["id", "name"],
      where: { type_id: 1 },
      order: [["name", "ASC"]],
    });

  
    res.json({
      data: result,
      total: result.length,
      message: message,
      type: "info",
    });
  } catch (e) {
    
    res
      .status(500)
      .json({
        message: "Что-то пошло не так, попробуйте снова",
        type: "danger",
      });
  }
};
