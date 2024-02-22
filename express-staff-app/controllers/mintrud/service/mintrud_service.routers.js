const express = require('express');
const router = express.Router();

const controllers_mintrud_service = require('./mintrud_service.controllers')



//? updateDataMintrud первичное заполнение таблицы
router.get('/fillTableMintrud', controllers_mintrud_service.fillTableMintrud);


// Экспорт маршрутов
module.exports = router;