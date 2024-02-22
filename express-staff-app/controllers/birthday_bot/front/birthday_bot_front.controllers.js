// Импорт необходимых модулей и библиотек
const db = require("../../../models");
const { QueryTypes } = require("sequelize");
const SQL = require("./SQL.js");
const dayjs = require("dayjs");

//? Получить все записи из таблицы  birthday_bot
exports.getAllEmployees = async (req, res) => {
  try {
    // Выполнение SQL-запроса для извлечения всех записей из таблицы birthday_bot
    const data = await db.sequelize.query("select * from birthday_bot", {
      type: QueryTypes.SELECT,
    });

    // Отправка извлеченных данных в качестве ответа
    res.send(data);
  } catch (e) {
    // Обработка и регистрация любых возникающих ошибок
    console.log(e);
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Ошибка ---> ${e.toString()}`
    );
  }
};
//? Обновить поля в табилце birthday_bot для выбранного сотрудника
exports.updateSelectEmployee = async (req, res) => {
  try {
    const data = req.body;
    // Обновление данных о выбранном сотруднике в таблице birthday_bot
    await db.birthday_bot.update(data, {
      where: {
        employee_id: req.body.employee_id,
      },
    });

    res.send("Поля о сотруднике успешно обновлены");
  } catch (e) {
    // Обработка и отправка ошибки в случае возникновения исключения
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Ошибка ---> ${e.toString()}`
    );
  }
};

//? Удалить в табилце birthday_bot выбранного сотрудника
exports.deleteSelectEmployee = async (req, res) => {
  try {
    // Удаление выбранного сотрудника из таблицы birthday_bot
    await db.birthday_bot.destroy({
      where: {
        employee_id: req.query.employee_id,
      },
    });
    res.send("Сотрудник удален успешно");
  } catch (e) {
    // Обработка и отправка ошибки в случае возникновения исключения
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Ошибка ---> ${e.toString()}`
    );
  }
};
//? Проверка на существование в табилце birthday_bot выбранного сотрудника
exports.checkSelectEmployee = async (req, res) => {
  try {
    // Поиск выбранного сотрудника в таблице birthday_bot
    const existingRecord = await db.sequelize.query(
      "select * from birthday_bot where employee_id in (:employee_id)",
      {
        type: QueryTypes.SELECT,
        replacements: {
          employee_id: req.query.employee_id,
        },
      }
    );

    // Проверка наличия выбранного сотрудника и отправка соответствующего результата
    if (existingRecord.length) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {
    // Обработка и отправка ошибки в случае возникновения исключения
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Ошибка ---> ${e.toString()}`
    );
  }
};

//? создать запись с новым сотрудником в табилцу birthday_bot
exports.createSelectEmployee = async (req, res) => {
  try {
    // Поиск существующего сотрудника в таблице birthday_bot
    const searchData = await db.sequelize.query(
      "select * from birthday_bot where employee_id in (:employee_id)",
      {
        type: QueryTypes.SELECT,
        replacements: {
          employee_id: req.query.employee_id,
        },
      }
    );

    // Проверка наличия сотрудника и отправка сообщения, если он уже существует
    if (searchData.length) return res.send("Пользователь уже существует");

    // Получение данных о новом сотруднике и добавление их в таблицу birthday_bot
    let data = await db.sequelize.query(SQL.GetSelectEmployees, {
      replacements: {
        employee_id: req.query.employee_id,
      },
      type: QueryTypes.SELECT,
    });

    await db.birthday_bot.bulkCreate(data);

    // Отправка данных о новом сотруднике в качестве ответа
    res.send(data);
  } catch (e) {
    // Обработка и отправка ошибки в случае возникновения исключения
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Ошибка ---> ${e.toString()}`
    );
  }
};


//? Получить всех сотрудников 

exports.getEmployees = async (req, res) => {
  try {
    let data = await db.sequelize.query(SQL.GetAllEmployees, {
      type: QueryTypes.SELECT,
    });

    res.send(data);
  } catch (e) {
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};