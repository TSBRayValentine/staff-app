"use strict";

const fs = require("fs"); // Модуль для работы с файловой системой
const path = require("path"); // Модуль для работы с путями к файлам
const Sequelize = require("sequelize"); // Подключение библиотеки Sequelize для работы с базой данных
const basename = path.basename(__filename); // Получение имени текущего файла
const env = process.env.NODE_ENV || "development"; // Определение текущего окружения
const config = require(__dirname + "/../config/config.json")[env]; // Получение конфигурации базы данных из файла
const db = {}; // Инициализация объекта для хранения моделей

let sequelize;
if (config.use_env_variable) {
  // Использование переменной окружения для подключения к базе данных, если указано в конфигурации
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Подключение к базе данных на основе конфигурационных данных
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // Динамический импорт моделей из текущего каталога
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model; // Добавление импортированной модели в объект db
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    // Установка ассоциаций между моделями, если метод associate существует
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Добавление объекта соединения с базой данных в объект db
db.Sequelize = Sequelize; // Добавление библиотеки Sequelize в объект db

module.exports = db; // Экспорт объекта db для использования в других частях приложения
