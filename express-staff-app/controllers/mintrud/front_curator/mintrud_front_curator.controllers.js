const db = require("../../../models");
const { QueryTypes } = require("sequelize");

const mintrud = db.mintrud;


//? Для получения выпадающего списка

exports.getOrganizations = async (req, res) => {
  try {
    result = await db.sequelize.query(
      "Select organization_name, organization_id from mintruds GROUP by organization_name,organization_id  order by organization_name ASC ",
      {
        type: QueryTypes.SELECT,
      }
    );

    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

//? Обновление данных 
exports.updateDataOrganization = async (req, res) => {
  try {
    const data = req.body.data;

    for (const item of data) {
      await mintrud.update(
        {
          p1: item.p1,
          p2: item.p2,
          p3: item.p3,
          p4: item.p4,
          p5: item.p5,
          p6: item.p6,
          p61: item.p61,
          p7: item.p7,
          p8: item.p8,
        },
        {
          where: {
            group_category_id: item.group_category_id,
            organization_id: req.body.organization_id,
          },
        }
      );
    }
    res.send("Успех");
  } catch (error) {
    res.send(error);
  }
};

//? Получить данные 
exports.getDataMintrudOrganization = async (req, res) => {
  try {
    result = await db.sequelize.query(
      "Select * from mintruds where organization_id = :organization_id order by level ASC",
      {
        type: QueryTypes.SELECT,
        replacements: {
          organization_id: req.query.organization_id,
        },
      }
    );

    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

