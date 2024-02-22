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
  let series = [];
  let categories = [];

  // Iterate over each object in the input array
  for (let i = 0; i < input.length; i++) {
    let obj = input[i];

    // Extract the label and add it to the categories array
    categories.push(formatDate(obj.label));

    // Iterate over the keys of the object
    for (let key in obj) {
      if (key !== "label") {
        // Check if the key is already present in the series array
        let existingSeries = series.find((s) => s.name === key);

        if (existingSeries) {
          // If the series already exists, add the data to it
          existingSeries.data.push(obj[key]);
        } else {
          // If the series doesn't exist, create a new series object and add it to the series array
          series.push({
            name: key,
            data: [obj[key]],
          });
        }
      }
    }
  }

  return {
    series: series,
    categories: categories,
  };
}

exports.getCountEmployeesStageNew= async (req, res) => {
  try {
    
    let inputArray = await db.sequelize.query(SQL.CountEmployeesStageNew, {
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


exports.getCountEmployeesStageNewOrganization = async (req, res) => {
  try {
    const organizationIds = req.body.data.map(item => item.id); 
    let inputArray = await db.sequelize.query(SQL.CountEmployeesStageNewOrganization, {
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
