const express = require('express');
const router = express.Router();

const controllers_birthday_bot_front = require('./birthday_bot_front.controllers.js')

//? Получить все записи из таблицы  birthday_bot 
router.get('/getAllEmployees', controllers_birthday_bot_front.getAllEmployees);

//? Проверка на существование в табилце birthday_bot выбранного сотрудника
router.get('/checkSelectEmployee', controllers_birthday_bot_front.checkSelectEmployee);

//? Обновить поля в табилце birthday_bot для выбранного сотрудника
router.post('/updateSelectEmployee', controllers_birthday_bot_front.updateSelectEmployee);

//? Удалить в табилце birthday_bot выбранного сотрудника
router.get('/deleteSelectEmployee', controllers_birthday_bot_front.deleteSelectEmployee);

//? создать запись с новым сотрудником в табилцу birthday_bot 
router.get('/createSelectEmployee', controllers_birthday_bot_front.createSelectEmployee);

//? Получить всех сотрудников КГС
router.get('/getEmployees', controllers_birthday_bot_front.getEmployees);

// Экспорт маршрутов
module.exports = router;