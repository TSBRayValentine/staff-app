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

exports.getCountEmployeesStageCommonTest= async (req, res) => {
  try {
    const groupcategoryIds = req.body.data.groupcategory.map(item => item.id);
    let inputArray = await db.sequelize.query(SQL.CountEmployeesStageCommonTest, {
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


exports.getCountEmployeesStageCommonTestOrganization = async (req, res) => {
  try {
    const groupcategoryIds = req.body.data.groupcategory.map(item => item.id);
    const organizationIds = req.body.data.organization.map(item => item.id);
  
    let inputArray = await db.sequelize.query(SQL.CountEmployeesStageCommonTestOrganization, {
      replacements: {
        organization_id: organizationIds,
        group_category_id: groupcategoryIds,
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
