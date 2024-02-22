const db = require("../../../models");
const { QueryTypes } = require("sequelize");


const mintrud = db.mintrud;

const SQL = require("./SQL.js");


exports.fillTableMintrud = async (req, res) => {
  try {
    let result

    result = await db.sequelize.query("Select * from mintruds", {
      type: QueryTypes.SELECT,
    });
    
    console.log(result)
    // Если данных нет - заполнить 
    if (result.length === 0)   {

     result = await db.sequelize.query(SQL.Organization_All, {
      type: QueryTypes.SELECT,
    });

    await mintrud.bulkCreate(result);

    } 


    result = await db.sequelize.query("Select * from mintruds", {
      type: QueryTypes.SELECT,
    });


    res.send(result)

   

  } catch (e) {
    console.log(
      `TEST | TEST | Ошибка выполнения | Ошибка - ${e}`
    );
  }
};

