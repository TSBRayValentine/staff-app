const db = require("../../models");
const { QueryTypes } = require("sequelize");

const SQL = require("./SQL.js");

exports.getDataPhonebook = async (req, res) => {
  try {
    // Запрос к базе данных
    let result = await db.sequelize.query(SQL.phonebook_data, {
      type: QueryTypes.SELECT,
    });
    res.send(result)
  } catch (e) {
    console.log(
      `PHONEBOOK | getDataPhonebook | Ошибка выполнения | Ошибка - ${e}`
    );
  }
};

exports.getEmployeeInfo = async (req, res) => {
  try {
    // Запрос к базе данных
    let result = await db.sequelize.query(SQL.employee_info, {
      replacements: {
        id: parseInt(req.query.id),
      },
      type: QueryTypes.SELECT,
    });
    res.send(result[0])
  } catch (e) {
    console.log(
      `PHONEBOOK | getEmployeeInfo | Ошибка выполнения | Ошибка - ${e}`
    );
    res.send('err')
  }
};

