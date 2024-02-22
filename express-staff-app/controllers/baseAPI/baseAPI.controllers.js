// Импорт необходимых модулей и библиотек
const db = require("../../models");
const { QueryTypes } = require("sequelize");
const K = require("../../lib");
const SQL = require("./SQL.js"); // Импорт SQL-запросов из отдельного файла
const dayjs = require("dayjs");

// Функция для получения категории группы
exports.getGroupCategory= async (req, res) => {
  try {
    // Выполнение SQL-запроса для извлечения категорий групп
    let inputArray = await db.sequelize.query(SQL.GroupCategory, {
      type: QueryTypes.SELECT,
    }); 

    // Отправка извлеченных категорий групп в качестве ответа
    res.send(inputArray)

  } catch (e) {
    // Обработка и регистрация любых возникающих ошибок
    console.log("DYNAMICS | API | TEST | TEST | ");
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Ошибка ---> ${e.toString()}`
    );
  }
};
