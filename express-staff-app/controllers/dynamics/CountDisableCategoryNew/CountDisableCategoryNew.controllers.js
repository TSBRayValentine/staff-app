const db = require("../../../models");
const { QueryTypes } = require("sequelize");
const K = require("../../../lib");

const dynamics_cache_organizations = db.dynamics_cache_organizations;
const dynamics_vacancies_free = db.dynamics_vacancies_free;
const dynamics_staff_turnover = db.dynamics_staff_turnover;

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
    const { label, category_name, disabled_count } = item;

    // Преобразуем дату в формат "день/месяц/год"
    const date = new Date(label);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // Добавляем дату в список категорий, если она еще не добавлена
    if (!output.categories.includes(formattedDate)) {
      output.categories.push(formattedDate);
    }

    // Если категория уже существует, добавляем значение в соответствующий массив данных
    if (dataByCategory[category_name]) {
      dataByCategory[category_name].push(disabled_count);
    } else {
      // Если категория еще не существует, создаем новый объект данных для нее
      dataByCategory[category_name] = [disabled_count];
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



exports.getCountDisableCategoryNew= async (req, res) => {
  try {
    let inputArray = await db.sequelize.query(SQL.CountDisableCategoryNew, {
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


exports.getCountDisableCategoryNewOrganization = async (req, res) => {
  try {
    const organizationIds = req.body.data.map(item => item.id); 
    let inputArray = await db.sequelize.query(SQL.CountDisableCategoryNewOrganization, {
      replacements: {
        organization_id: organizationIds,
      },
      type: QueryTypes.SELECT,
    }); 

    res.send(transformData(inputArray))
  } catch (e) {
    console.log(
     e
    );
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};
