const db = require("../../../models");
const { QueryTypes } = require("sequelize");
const K = require("../../../lib");


const SQL = require("./SQL.js");

const dayjs = require("dayjs");

function formatDate(label) {
  // Преобразуем дату в формат "день/месяц/год"
  const date = new Date(label);
  return formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}



function transformInput(input) {
  let categories = [];
  let series = {};

  for (let item of input) {
    let label = item.label;
    let category_name = item.category_name;
    let data = item.data;


    if (!series[category_name]) {
      series[category_name] = { name: category_name, data: [] };
    }

    series[category_name].data.push(data);

    if (!categories.includes(label)) {
      categories.push(label);
    }
  }


  categories = categories.map((label) => formatDate(label));

  let transformedData = {
    series: Object.values(series),
    categories: categories,
  };

  return transformedData;
}

exports.getCountEmployeesNew = async (req, res) => {
  try {
    let inputArray = await db.sequelize.query(SQL.CountEmployeesNew, {
      type: QueryTypes.SELECT,
    });

    res.send(transformInput(inputArray))

  } catch (e) {
    console.log("DYNAMICS | API | TEST | TEST | ");
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};
exports.getCountEmployeesNewOrganization = async (req, res) => {
  try {

    const organizationIds = req.body.data.map(item => item.id); // Получаем массив идентификаторов организаций из req.body.data
    let inputArray = await db.sequelize.query(SQL.CountEmployeesNewOrganization, {
      replacements: {
        organization_id: organizationIds,
      },
      type: QueryTypes.SELECT,
    });

    res.send(transformInput(inputArray));
  } catch (e) {
    console.log(
      e
    );
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};