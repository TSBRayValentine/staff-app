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

function transformData(input) {
  const output = {
    series: [],
    categories: []
  };

  const seriesMap = new Map();

  for (const item of input) {
    const { label, sex, cnt } = item;

    if (!seriesMap.has(sex)) {
      seriesMap.set(sex, []);
    }

    seriesMap.get(sex).push(cnt);

    if (!output.categories.includes(formatDate(label))) {
      output.categories.push(formatDate(label));
    }
  }

  for (const [sex, data] of seriesMap) {
    output.series.push({
      name: sex,
      data: data
    });
  }

  return output;
}
exports.getPopulationTest= async (req, res) => {
  try {
    
    const groupcategoryIds = req.body.data.groupcategory.map(item => item.id);
    let inputArray = await db.sequelize.query(SQL.PopulationTest, {
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


exports.getPopulationTestOrganization = async (req, res) => {
  try {
    const groupcategoryIds = req.body.data.groupcategory.map(item => item.id);
    const organizationIds = req.body.data.organization.map(item => item.id);
    let inputArray = await db.sequelize.query(SQL.PopulationTestOrganization, {
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
