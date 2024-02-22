const express = require('express');
const router = express.Router();

const controllers_vacation = require('./vacation.controllers.js')

//? Получить все записи из таблицы  birthday_bot 
router.get('/getVacation', controllers_vacation.getVacation);

//? Выгрузка в EXCEL
router.get('/downloadVacationExcel', controllers_vacation.downloadVacationExcel);


// Экспорт маршрутов
module.exports = router;