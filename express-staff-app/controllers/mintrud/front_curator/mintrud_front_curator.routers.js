const express = require('express');
const router = express.Router();

const controllers_mintrud_front_curator = require('./mintrud_front_curator.controllers')

//? Для получения выпадающего списка
router.get('/getOrganizations', controllers_mintrud_front_curator.getOrganizations);


//? Получить данные
router.get('/getDataMintrudOrganization', controllers_mintrud_front_curator.getDataMintrudOrganization);

//? Обновление данных 
router.post('/updateDataOrganization', controllers_mintrud_front_curator.updateDataOrganization);




// Экспорт маршрутов
module.exports = router;