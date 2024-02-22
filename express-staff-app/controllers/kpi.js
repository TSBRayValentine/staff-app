const db = require("../models");
const K = require("../lib");
const { QueryTypes } = require("sequelize");

const Excel = require("exceljs");

// add record
exports.createGoal = async (req, res) => {
  try {
    const new_goal = await db.kpi_goal.create({
      goal: req.body.goal,
    });

    for (organization_id of req.body.organizations_id) {
      const new_kpi = await db.kpi.create({
        organization_id: organization_id,
        quarter: req.body.quarter,
        year: req.body.year,
        kpi_goal_id: new_goal.dataValues.id,
      });
    }

    res.send("Создано");
  } catch (e) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "danger",
    });
  }
};

// get all goals record in table kpi_goal
exports.getAllGoals = async (req, res) => {
  try {
    const SQL = `
    SELECT distinct (kpi.kpi_goal_id) , kpi.year, kpi.quarter, kpi_goals.goal
    FROM kpi  
    LEFT OUTER JOIN kpi_goals ON (kpi_goals.id = kpi.kpi_goal_id)                
      `;

    let result = await db.sequelize.query(SQL, { type: QueryTypes.SELECT });

    res.send(result);
  } catch (e) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: e,
    });
  }
};

// getAllGoals for organization_id
exports.getGoalsOrganization = async (req, res) => {
  try {
    const all_goals = await db.kpi.findAll({
      where: {
        organization_id: req.query.organization_id,
      },
      include: db.kpi_goal,
    });
    res.json(all_goals);
  } catch (e) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "danger",
    });
  }
};

// update record
exports.updateGoal = async (req, res) => {
  try {
    await db.kpi.update(
      {
        status: req.body.status,
        error_description: req.body.error_description,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.send("Запись обновлена");
  } catch (e) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "danger",
    });
  }
};

// delete All data in kpi and kpi_goal tables
exports.deleteGoal = async (req, res) => {
  try {
    db.kpi_goal.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.send("Удалено");
  } catch (e) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: "danger",
    });
  }
};

// getAllGoals for organization_id
exports.getStatistics = async (req, res) => {
  try {
    const SQL = `
      select 
      organizations.name as organization_name,
      count(distinct(kpi.kpi_goal_id)) filter (where kpi.quarter = :quarter and kpi.year = :year ) as count_all_goals,     
      count(kpi.id) filter (where kpi.status = true and kpi.quarter = :quarter and kpi.year = :year) as count_done

      from kpi

      inner join organizations on (organizations.id = kpi.organization_id)

      group by organizations.name      
             
      `;

    let result = await db.sequelize.query(SQL, {
      replacements: {
        quarter: req.query.quarter,
        year: req.query.year,
      },
      type: QueryTypes.SELECT,
    });

    result = result.filter((item) => {
      return (
        item.organization_name !== "Администрация Губернатора Санкт-Петербурга"
      );
    });

    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова",
      type: e,
    });
    console.log(e);
  }
};

// getAllGoals for organization_id
exports.getStatisticsExcel = async (req, res) => {
  let result = [];
  let data = [];

  try {
    const SQL = `
      select 
      organizations.name as organization_name,
      count(distinct(kpi.kpi_goal_id)) filter (where kpi.quarter = :quarter and kpi.year = :year ) as count_all_goals,     
      count(kpi.id) filter (where kpi.status = true and kpi.quarter = :quarter and kpi.year = :year) as count_done

      from kpi

      inner join organizations on (organizations.id = kpi.organization_id)

      group by organizations.name      
             
      `;

    result = await db.sequelize.query(SQL, {
      replacements: {
        quarter: req.query.quarter,
        year: req.query.year,
      },
      type: QueryTypes.SELECT,
    });

    result = result.filter((item) => {
      return (
        item.organization_name !== "Администрация Губернатора Санкт-Петербурга"
      );
    });

    data = result.map((item) => {
      return {
        organization_name: item.organization_name,
        count_all_goals: item.count_all_goals,
        count_done: item.count_done,
        count_done_percent: item.count_done / item.count_all_goals,
      };
    });
    data = data.sort((a, b) => {
      if (a.organization_name < b.organization_name) return -1;
      if (a.organization_name > b.organization_name) return 1;
      return 0;
    });
  } catch (e) {
    res.send(e);
  }
  
    const dNow = new Date();
    const dNowStr = K.dStr(dNow);
  
    const templateName = "./export/kpi/kpi.xlsx";
    const saveFileName = "./export_files/kpi/kpi-" + dNowStr + ".xlsx";
    const fileName = `Показатели KPI за ${req.query.quarter} квартал ${req.query.year} года.xlsx`;
  
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(templateName);
    let sheet_data = workbook.getWorksheet("Данные");
    const day = dNow.getDate();
    const month = K.months[dNow.getMonth()];
    const year = dNow.getFullYear();
  
    const borderStyles = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

  // 
  try {
    sheet_data.getCell(
      "A1"
    ).value = `Показатели KPI за ${req.query.quarter} квартал ${req.query.year} года`;
    sheet_data.getCell("A3").value =
      'по состоянию на "' + day + '" ' + month + " " + year + " года";
  } catch (error) {
    res.send(error)
  }

  try {
    if (result[0].count_all_goals != 0) {
      data.forEach((dataItem, dataIndex) => {
        // Присвоение значений ячейкам
        sheet_data.getCell(`A${dataIndex + 7}`).value = dataIndex + 1;
        sheet_data.getCell(`B${dataIndex + 7}`).value =
          dataItem.organization_name;
        sheet_data.getCell(`C${dataIndex + 7}`).value =
          dataItem.count_all_goals;
        sheet_data.getCell(`D${dataIndex + 7}`).value = dataItem.count_done;
        sheet_data.getCell(`E${dataIndex + 7}`).value =
          dataItem.count_done_percent;

        //Форматирование ячеек
        sheet_data.getCell(`A${dataIndex + 7}`).border = borderStyles;
        sheet_data.getCell(`B${dataIndex + 7}`).border = borderStyles;
        sheet_data.getCell(`C${dataIndex + 7}`).border = borderStyles;
        sheet_data.getCell(`D${dataIndex + 7}`).border = borderStyles;
        sheet_data.getCell(`E${dataIndex + 7}`).border = borderStyles;
      });
    } else {
      sheet_data.getCell(
        "A1"
      ).value = `Задач за ${req.query.quarter} квартал ${req.query.year} года не обнаружено`;
      sheet_data.getCell("A3").value =
        'по состоянию на "' + day + '" ' + month + " " + year + " года";
    }

    await workbook.xlsx.writeFile(saveFileName);

    return res.download(saveFileName, fileName);
  } catch (e) {
    sheet_data.getCell(
      "A1"
    ).value = `Задач за ${req.query.quarter} квартал ${req.query.year} года не обнаружено`;
    sheet_data.getCell("A3").value =
      'по состоянию на "' + day + '" ' + month + " " + year + " года";
    await workbook.xlsx.writeFile(saveFileName);

    return res.download(saveFileName, fileName);
  }
};
