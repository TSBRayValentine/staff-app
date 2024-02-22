const db = require("../../../models");
const { QueryTypes } = require("sequelize");
const K = require("../../../lib");

const SQL = require("./SQL.js");

const dayjs = require("dayjs");

function formatDate(dateString) {
  var dateParts = dateString.split("-");
  var year = dateParts[0];
  var month = dateParts[2];
  var day = dateParts[1];
  return day + "/" + month + "/" + year;
}


function transformData(input) {
  const output = {
    series: [],
    categories: []
  };

  // Создаем объект для хранения данных по категориям
  const dataByCategory = {};

  // Обрабатываем каждый элемент входного массива
  input.forEach(item => {
    const { label, category_name, count_candidate } = item;

    // Преобразуем дату в формат "день/месяц/год"
    const date = new Date(label);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // Добавляем дату в список категорий, если она еще не добавлена
    if (!output.categories.includes(formattedDate)) {
      output.categories.push(formattedDate);
    }

    // Если категория уже существует, добавляем значение в соответствующий массив данных
    if (dataByCategory[category_name]) {
      dataByCategory[category_name].push(count_candidate);
    } else {
      // Если категория еще не существует, создаем новый объект данных для нее
      dataByCategory[category_name] = [count_candidate];
    }
  });

  // Преобразуем объект данных по категориям в массив объектов серий
  for (const category in dataByCategory) {
    output.series.push({
      name: category,
      data: dataByCategory[category]
    });
  }

  return output;
}



exports.getCountCandidateCategoryNew= async (req, res) => {
  try {
    let inputArray = await db.sequelize.query(SQL.CountCandidateCategoryNew, {
      type: QueryTypes.SELECT,
    }); 

    res.send(transformData(inputArray))

  } catch (e) {
    console.log("DYNAMICS | API | TEST | TEST | ");
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};


exports.getCountCandidateCategoryNewOrganization = async (req, res) => {
  try {
    const organizationIds = req.body.data.map(item => item.id); 
    let inputArray = await db.sequelize.query(SQL.CountCandidateCategoryNewOrganization, {
      replacements: {
        organization_id: organizationIds,
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
