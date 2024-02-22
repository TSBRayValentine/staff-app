const db = require("../../../models");
const { QueryTypes } = require("sequelize");
const K = require("../../../lib");

const dynamics_cache_organizations = db.dynamics_cache_organizations;
const dynamics_vacancies_free = db.dynamics_vacancies_free;
const dynamics_staff_turnover = db.dynamics_staff_turnover;

const SQL = require("./SQL.js");

const dayjs = require("dayjs");


function formatDate(label) {
  // Преобразуем дату в формат "день/месяц/год"
  const date = new Date(label);
  return formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}



function transformData(input) {
  var output = {
    series: [
      {
        name: "Средний возраст",
        data: []
      }
    ],
    categories: []
  };

  for (var i = 0; i < input.length; i++) {
    var dataPoint = input[i];
    output.series[0].data.push(dataPoint.avager_age);
    output.categories.push(formatDate(dataPoint.label));
  }

  return output;
}
exports.getAvargeAgeEmployeesTest= async (req, res) => {
  try {
    const groupcategoryIds = req.body.data.groupcategory.map(item => item.id);
    let inputArray = await db.sequelize.query(SQL.AvargeAgeEmployeesTest, {
      type: QueryTypes.SELECT,
      replacements: {
        group_category_id: groupcategoryIds,
      },
    }); 

    res.send(transformData(inputArray))

  } catch (e) {
    console.log("DYNAMICS | API | TEST | TEST | ");
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};


exports.getAvargeAgeEmployeesTestOrganization = async (req, res) => {
  try {
    const groupcategoryIds = req.body.data.groupcategory.map(item => item.id);
    const organizationIds = req.body.data.organization.map(item => item.id);
  
    let inputArray = await db.sequelize.query(SQL.AvargeAgeEmployeesTestOrganization, {
      replacements: {
        organization_id: organizationIds,
        group_category_id: groupcategoryIds,
      },
      type: QueryTypes.SELECT,
    }); 

    res.send(transformData(inputArray))
  } catch (e) {
    console.log(
      "DYNAMICS | Загрузка информации о кол-ве всех сотрудников по всем организациям - ошибка"
    );
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};
