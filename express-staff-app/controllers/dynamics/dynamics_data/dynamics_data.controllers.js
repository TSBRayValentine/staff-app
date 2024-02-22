
const db = require("../../../models");
const { QueryTypes } = require("sequelize");


const dynamics_main = db.dynamics_main;
const dynamics_education = db.dynamics_education;
const dynamics_children = db.dynamics_children;

const dynamics_cache_organizations = db.dynamics_cache_organizations;
const dynamics_vacancies_free = db.dynamics_vacancies_free;
const dynamics_staff_turnover = db.dynamics_staff_turnover;


const SQL = require("./SQL.js");
const SQL_Date = require("./SQL_Date.js");

const dayjs = require("dayjs");

exports.push_data = async (req, res) => {
  try {

    // Главная таблица

    let result = await db.sequelize.query(SQL.main, {
      type: QueryTypes.SELECT,
    });

    await dynamics_main.bulkCreate(result);

    console.log("Загрузка исходных данных для главной таблицы  - выполнено");
    // Образование

    result = await db.sequelize.query(SQL.education, {
      type: QueryTypes.SELECT,
    });

    await dynamics_education.bulkCreate(result);
    console.log(
      "Загрузка исходных данных для таблицы с образованиями - выполнено"
    );

    // Дети

    result = await db.sequelize.query(SQL.children, {
      type: QueryTypes.SELECT,
    });

    await dynamics_children.bulkCreate(result);
    console.log("Загрузка исходных данных для таблицы с детьми - выполнено");

    // Получение id всех организаций

    const query_organizations =
      "select distinct (organization_id) from dynamics_main";

    const result_organizations = await db.sequelize.query(query_organizations, {
      type: QueryTypes.SELECT,
    });
    console.log("Загрузка информации об организациях - выполнено");

    // Цикл для заполнения КЭШа по всем организациям

    if (process.env.NODE_ENV === "production") {
      for (let organization of result_organizations) {
        result = await db.sequelize.query(SQL.cache_organization_PostgreSQL, {
          replacements: {
            organization_id: organization.organization_id,
          },
          type: QueryTypes.SELECT,
        });

        await dynamics_cache_organizations.bulkCreate(result);
      }
    } else {
      for (let organization of result_organizations) {
        result = await db.sequelize.query(SQL.cache_organization_SQLite, {
          replacements: {
            organization_id: organization.organization_id,
          },
          type: QueryTypes.SELECT,
        });

        await dynamics_cache_organizations.bulkCreate(result);
      }
    }
    console.log("Формирование кэша для каждой организации - выполнено");

    // Вакансии

    for (let organization of result_organizations) {
      result = await db.sequelize.query(SQL.vacancies_free, {
        replacements: {
          organization_id: organization.organization_id,
        },
        type: QueryTypes.SELECT,
      });

      await dynamics_vacancies_free.bulkCreate(result);
    }

    console.log("Загрузка данных о вакансиях - выполнено");

    // Текучесть

        for (let organization of result_organizations) {
          result = await db.sequelize.query(SQL.staff_turnover, {
            replacements: {
              organization_id: organization.organization_id,
            },
            type: QueryTypes.SELECT,
          });
    
          await dynamics_staff_turnover.bulkCreate(result);
        }
    
        console.log("Загрузка данных о текучести - выполнено");

        
    console.log("Операция выполнена");

    res.send(
      `${dayjs().format(
        "DD.MM.YYYY - HH:mm:ss"
      )} | Done ---> Operation completed successfully}\n`
    );
  } catch (e) {
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};

exports.delete_data = async (req, res) => {
  try {

    // Главная таблица

    await dynamics_main.destroy({
      where: {},
      truncate: true,
    });

    await dynamics_education.destroy({
      where: {},
      truncate: true,
    });
    await dynamics_children.destroy({
      where: {},
      truncate: true,
    });
    await dynamics_cache_organizations.destroy({
      where: {},
      truncate: true,
    });
    await dynamics_vacancies_free.destroy({
      where: {},
      truncate: true,
    });
    await dynamics_staff_turnover.destroy({
      where: {},
      truncate: true,
    });

    console.log("Удаление всех данных в таблицах динамики - выполнено");
    res.send("Удаление всех данных в таблицах динамики - выполнено");

  } catch (e) {
    console.log("Удаление всех данных в таблицах динамики - ошибка");
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};

exports.push_data_date = async (req, res) => {


  try {
    const date = `${req.query.year.toString()}-${req.query.month.toString()}-${req.query.day.toString()}`
   
    console.log(date)
    // Главная таблица

    let result = await db.sequelize.query(SQL_Date.main, {
      replacements: {
        date: date,
      },
      type: QueryTypes.SELECT,
    });

    await dynamics_main.bulkCreate(result);

    console.log("DATE | Загрузка исходных данных для главной таблицы  - выполнено");
    
    // Образование

    result = await db.sequelize.query(SQL_Date.education, {
      replacements: {
        date: date,
      },
      type: QueryTypes.SELECT,
    });

    await dynamics_education.bulkCreate(result);
    console.log(
      "DATE | Загрузка исходных данных для таблицы с образованиями - выполнено"
    );

    // Дети

    result = await db.sequelize.query(SQL_Date.children, {
      replacements: {
        date: date,
      },
      type: QueryTypes.SELECT,
    });

    await dynamics_children.bulkCreate(result);
    console.log("DATE | Загрузка исходных данных для таблицы с детьми - выполнено");

    // Получение id всех организаций

    const query_organizations =
      "select distinct (organization_id) from dynamics_main";

    const result_organizations = await db.sequelize.query(query_organizations, {
      type: QueryTypes.SELECT,
    });
    console.log("DATE | Загрузка информации об организациях - выполнено");

    // Цикл для заполнения КЭШа по всем организациям

    if (process.env.NODE_ENV === "production") {
      for (let organization of result_organizations) {
        result = await db.sequelize.query(SQL_Date.cache_organization_PostgreSQL, {
          replacements: {
            organization_id: organization.organization_id,
            date: date,
          },
          type: QueryTypes.SELECT,
        });

        await dynamics_cache_organizations.bulkCreate(result);
      }
    } else {
      for (let organization of result_organizations) {
        result = await db.sequelize.query(SQL_Date.cache_organization_SQLite, {
          replacements: {
            organization_id: organization.organization_id,
            date: date,
          },
          type: QueryTypes.SELECT,
        });

        await dynamics_cache_organizations.bulkCreate(result);
      }
    }
    console.log("DATE | Формирование кэша для каждой организации - выполнено");

    // Вакансии

    for (let organization of result_organizations) {
      result = await db.sequelize.query(SQL_Date.vacancies_free, {
        replacements: {
          organization_id: organization.organization_id,
          date: date,
        },
        type: QueryTypes.SELECT,
      });

      await dynamics_vacancies_free.bulkCreate(result);
    }

    console.log("DATE | Загрузка данных о вакансиях - выполнено");

    // Текучесть

    for (let organization of result_organizations) {
      result = await db.sequelize.query(SQL_Date.staff_turnover, {
        replacements: {
          organization_id: organization.organization_id,
          year: req.query.year.toString(),
          month: req.query.month.toString(),
          date: date,

        },
        type: QueryTypes.SELECT,
      });

      await dynamics_staff_turnover.bulkCreate(result);
    }

    console.log("DATE | Загрузка данных о текучести - выполнено");

        
    console.log("DATE | Операция выполнена");

    res.send(
      `${dayjs().format(
        "DD.MM.YYYY - HH:mm:ss"
      )} | Done ---> Operation completed successfully}\n`
    );
  } catch (e) {
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};