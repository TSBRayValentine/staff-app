const db = require("../../../models"); // Подключение модуля для работы с базой данных
const { QueryTypes } = require("sequelize"); // Импорт необходимых типов запросов из библиотеки sequelize
const SQL = require("./SQL.js"); // Импорт SQL-запросов из отдельного файла
const dayjs = require("dayjs"); // Импорт библиотеки для работы с датами

function formatDate(label) {
  // Функция для форматирования даты в формат "день/месяц/год"
  const date = new Date(label);
  return formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function transformData(input) {
  // Функция для преобразования данных
  var output = {
    series: [],
    categories: []
  };

  var categories = [];
  for (var i = 0; i < input.length; i++) {
    var dataPoint = input[i];
    var categoryIndex = categories.indexOf(dataPoint.category_name);

    if (categoryIndex === -1) {
      categories.push(dataPoint.category_name);
      categoryIndex = categories.length - 1;
      output.series.push({
        name: dataPoint.category_name,
        data: []
      });
    }

    output.series[categoryIndex].data.push(dataPoint.avager_age);

    if (!output.categories.includes(formatDate(dataPoint.label))) {
      output.categories.push(formatDate(dataPoint.label));
    }
  }

  return output;
}

exports.getAvargeAgeEmployeesCategoryNew= async (req, res) => {
  try {
    let inputArray = await db.sequelize.query(SQL.AvargeAgeEmployeesCategoryNew, {
      type: QueryTypes.SELECT,
    }); 
    res.send(transformData(inputArray)); // Отправка преобразованных данных в ответ на запрос
  } catch (e) {
    console.log("DYNAMICS | API | TEST | TEST | ");
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};

exports.getAvargeAgeEmployeesCategoryNewOrganization = async (req, res) => {
  try {
    const organizationIds = req.body.data.map(item => item.id); 
    let inputArray = await db.sequelize.query(SQL.AvargeAgeEmployeesCategoryNewOrganization, {
      replacements: {
        organization_id: organizationIds,
      },
      type: QueryTypes.SELECT,
    }); 
    res.send(transformData(inputArray)); // Отправка преобразованных данных в ответ на запрос
  } catch (e) {
    console.log(
     e
    );
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};
