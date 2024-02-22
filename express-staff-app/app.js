const cors = require("cors"); // Подключение модуля для обработки CORS
const express = require("express"); // Подключение модуля Express.js
const config = require("config"); // Подключение модуля для работы с конфигурацией
const path = require("path"); // Подключение модуля для работы с путями к файлам и директориям
const cookieParser = require("cookie-parser"); // Подключение модуля для работы с куками
const session = require("express-session"); // Подключение модуля для работы с сессиями
const SessionStore = require("express-session-sequelize")(session.Store); // Подключение модуля для хранения сессий в базе данных

const app = express(); // Создание экземпляра приложения Express

const db = require("./models"); // Подключение модуля для работы с базой данных

const sequelizeSessionStore = new SessionStore({
  db: db.sequelize,
  checkExpirationInterval: 1800000, // Интервал проверки истечения срока действия сессии
  expiration: 1800000, // Срок действия сессии
});
// -----------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------
//? Создание БД и заполнение исходными данными

const employee = require("./seed/employee.json");
const organizations = require("./seed/organizations.json");
const dynamics_cache_organizations = require("./seed/dynamics_cache_organizations.json");
const dynamics_staff_turnover = require("./seed/dynamics_staff_turnover.json");
const dynamics_vacancies_free = require("./seed/dynamics_vacancies_free.json");
const mintruds = require("./seed/mintruds.json");
const references_positiongroupcategory = require("./seed/references_positiongroupcategory.json");

db.sequelize.sync({ force: true })
  .then(() => {
    return Promise.all([
      db.organization.bulkCreate(organizations),
      db.references_positiongroupcategory.bulkCreate(references_positiongroupcategory),
      db.employee.bulkCreate(employee),
      db.mintrud.bulkCreate(mintruds),
      db.dynamics_cache_organizations.bulkCreate(dynamics_cache_organizations),
      db.dynamics_staff_turnover.bulkCreate(dynamics_staff_turnover),
      db.dynamics_vacancies_free.bulkCreate(dynamics_vacancies_free),
    ]);
  })

  .catch(error => {
    console.error('Ошибка:', error);
  });
// -----------------------------------------------------------------------------------------------------


app.use(express.json({ extended: true })); // Использование парсера JSON с флагом extended: true
app.use(cookieParser());

app.use(
  session({
    secret: config.get("sessionSecret"), // Секретный ключ сессии
    resave: false,
    store: sequelizeSessionStore,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false },
  })
);
// -----------------------------------------------------------------------------------------------------

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Разрешает запросы от всех источников
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// -----------------------------------------------------------------------------------------------------

app.use(
  cors({
    origin: [
      config.get("ui_url"),
      "http://localhost:8080",
      "http://localhost:5000",
      "https://localhost:8080",
    ],
    credentials: true, // Учет учетных данных в запросах
    exposedHeaders: ["set-cookie"], // Открытие доступа к заголовкам set-cookie
  })
);

app.use("/api/", require("./routes/business.routes")); // Использование маршрутов для бизнеса
app.use("/api/", require("./routes/service.routes")); // Использование маршрутов для сервиса

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build"))); // Использование статических файлов
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // Отправка файла index.html
  });
}

const PORT = config.get("port") || 5000; // Установка порта из конфигурации или по умолчанию 5000

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    ); // Запуск приложения на указанном порту


  } catch (e) {
    console.log("Server Error", e.message); // Вывод сообщения об ошибке сервера
    process.exit(1); // Выход из процесса с кодом 1
  }
}

start();
