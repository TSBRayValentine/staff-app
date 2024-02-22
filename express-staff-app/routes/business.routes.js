const { Router } = require('express')
const router = Router()

// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! Получение списка групп/категорий 

const baseAPI = require('../controllers/baseAPI/baseAPI.controllers.js')
router.get('/getGroupCategory',  baseAPI.getGroupCategory)
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! KPI


const kpi = require('../controllers/kpi.js')

// /api/kpi
router.get("/kpi/getGoalsOrganization", kpi.getGoalsOrganization) // Все задачи конкретной организации
router.get("/kpi/getAllGoals", kpi.getAllGoals) // Все существующие задачи

router.post("/kpi/createGoal", kpi.createGoal) // Добавить задачу
router.post("/kpi/updateGoal", kpi.updateGoal) // Изменить задачу
router.post("/kpi/deleteGoal", kpi.deleteGoal) // Удалить задачу

router.get("/kpi/getStatistics", kpi.getStatistics) // Получить статистику
router.get("/kpi/getStatisticsExcel", kpi.getStatisticsExcel) // Получить статистику Excel
// --------------------------------------------------------------------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! График отпусков

const routes_vacation = require('../controllers/vacation/vacation.routers'); 
router.use('/vacation',routes_vacation)
// --------------------------------------------------------------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! БОТ ДНЯ РОЖДЕНИЯ

// API для фронта 
const routes_birthday_bot_front = require('../controllers/birthday_bot/front/birthday_bot_front.routers'); 
router.use('/birthday_bot',routes_birthday_bot_front)


// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! ТЕЛЕФОННЫЙ СПРАВОЧНИК

const phonebook = require('../controllers/phonebook/phonebook.controllers.js')

router.get("/phonebook/getDataPhonebook",  phonebook.getDataPhonebook)
router.get("/phonebook/getEmployeeInfo",  phonebook.getEmployeeInfo)
// --------------------------------------------------------------------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! СТАТИСТИКА ПО ОКЛАДАМ

const salary_statistics = require('../controllers/salary-statistics/salary_statistics.controllers.js')

router.get("/salary_statistics/getSalaryStatisticsTotal", salary_statistics.getSalaryStatisticsTotal) // Статистика по всем организациям для госслужащих 


router.get("/salary_statistics/getSalaryInfo", salary_statistics.getSalaryInfo) // Уровень полноты заполнения 

// --------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! ДИНАМИКА

// Срезы для статистики динамики
const dynamics_data = require('../controllers/dynamics/dynamics_data/dynamics_data.controllers.js')

// /api/dynamics 
router.get('/push_data',  dynamics_data.push_data)
router.get('/push_data_date',  dynamics_data.push_data_date)
router.get('/delete_data',  dynamics_data.delete_data)

// Кол-во сотрудников всего
const CountEmployeesNew = require('../controllers/dynamics/CountEmployeesNew/CountEmployeesNew.controllers.js')
router.get('/dynamics/getCountEmployeesNew',  CountEmployeesNew.getCountEmployeesNew)
router.post('/dynamics/getCountEmployeesNewOrganization',  CountEmployeesNew.getCountEmployeesNewOrganization)

//Разбивка сотрудников по возрасту
const CountEmployeesAgesTest = require('../controllers/dynamics/CountEmployeesAgesTest/CountEmployeesAgesTest.controllers.js')
router.post('/dynamics/getCountEmployeesAgesTest',  CountEmployeesAgesTest.getCountEmployeesAgesTest)
router.post('/dynamics/getCountEmployeesAgesTestOrganization',  CountEmployeesAgesTest.getCountEmployeesAgesTestOrganization)

// Средний возраст сотрудников
const AvargeAgeEmployeesTest = require('../controllers/dynamics/AvargeAgeEmployeesTest/AvargeAgeEmployeesTest.controllers.js')

router.post('/dynamics/getAvargeAgeEmployeesTest',  AvargeAgeEmployeesTest.getAvargeAgeEmployeesTest)
router.post('/dynamics/getAvargeAgeEmployeesTestOrganization',  AvargeAgeEmployeesTest.getAvargeAgeEmployeesTestOrganization)

// средний возраст сотрудников по категориям
const AvargeAgeEmployeesCategoryNew = require('../controllers/dynamics/AvargeAgeEmployeesCategoryNew/AvargeAgeEmployeesCategoryNew.controllers.js')
router.get('/dynamics/getAvargeAgeEmployeesCategoryNew',  AvargeAgeEmployeesCategoryNew.getAvargeAgeEmployeesCategoryNew)
router.post('/dynamics/getAvargeAgeEmployeesCategoryNewOrganization',  AvargeAgeEmployeesCategoryNew.getAvargeAgeEmployeesCategoryNewOrganization)

// Кол-во по стажу в организации
const CountEmployeesStageTest = require('../controllers/dynamics/CountEmployeesStageTest/CountEmployeesStageTest.controllers.js')

router.post('/dynamics/getCountEmployeesStageTest',  CountEmployeesStageTest.getCountEmployeesStageTest)
router.post('/dynamics/getCountEmployeesStageTestOrganization',  CountEmployeesStageTest.getCountEmployeesStageTestOrganization)


const CountEmployeesStageNew = require('../controllers/dynamics/CountEmployeesStageNew/CountEmployeesStageNew.controllers.js')
router.get('/dynamics/getCountEmployeesStageNew',  CountEmployeesStageNew.getCountEmployeesStageNew)
router.post('/dynamics/getCountEmployeesStageNewOrganization',  CountEmployeesStageNew.getCountEmployeesStageNewOrganization)


const CountEmployeesStageGovNew = require('../controllers/dynamics/CountEmployeesStageGovNew/CountEmployeesStageGovNew.controllers.js')
router.get('/dynamics/getCountEmployeesStageGovNew',  CountEmployeesStageGovNew.getCountEmployeesStageGovNew)
router.post('/dynamics/getCountEmployeesStageGovNewOrganization',  CountEmployeesStageGovNew.getCountEmployeesStageGovNewOrganization)

// Кол-во по стажу общему
const CountEmployeesStageCommonTest = require('../controllers/dynamics/CountEmployeesStageCommonTest/CountEmployeesStageCommonTest.controllers.js')
router.post('/dynamics/getCountEmployeesStageCommonTest',  CountEmployeesStageCommonTest.getCountEmployeesStageCommonTest)
router.post('/dynamics/getCountEmployeesStageCommonTestOrganization',  CountEmployeesStageCommonTest.getCountEmployeesStageCommonTestOrganization)

// Разбивка по полу
const PopulationTest = require('../controllers/dynamics/PopulationTEST/PopulationTEST.controllers.js')

router.post('/dynamics/getPopulationTest',  PopulationTest.getPopulationTest)
router.post('/dynamics/getPopulationTestOrganization',  PopulationTest.getPopulationTestOrganization)

// кол-во инвалидов
const CountDisableCategoryNew = require('../controllers/dynamics/CountDisableCategoryNew/CountDisableCategoryNew.controllers.js')

router.get('/dynamics/getCountDisableCategoryNew',  CountDisableCategoryNew.getCountDisableCategoryNew)
router.post('/dynamics/getCountDisableCategoryNewOrganization',  CountDisableCategoryNew.getCountDisableCategoryNewOrganization)

// Кол-во с красным дипломом
const CountWithHonorsCategoryNew = require('../controllers/dynamics/CountWithHonorsCategoryNew/CountWithHonorsCategoryNew.controllers.js')

router.get('/dynamics/getCountWithHonorsCategoryNew',  CountWithHonorsCategoryNew.getCountWithHonorsCategoryNew)
router.post('/dynamics/getCountWithHonorsCategoryNewOrganization',  CountWithHonorsCategoryNew.getCountWithHonorsCategoryNewOrganization)

// Кол-во кандидатов
const CountCandidateCategoryNew = require('../controllers/dynamics/CountCandidateCategoryNew/CountCandidateCategoryNew.controllers.js')

router.get('/dynamics/getCountCandidateCategoryNew',  CountCandidateCategoryNew.getCountCandidateCategoryNew)
router.post('/dynamics/getCountCandidateCategoryNewOrganization',  CountCandidateCategoryNew.getCountCandidateCategoryNewOrganization)

// кол-во докторских
const CountDoctorCategoryNew = require('../controllers/dynamics/CountDoctorCategoryNew/CountDoctorCategoryNew.controllers.js')

router.get('/dynamics/getCountDoctorCategoryNew',  CountDoctorCategoryNew.getCountDoctorCategoryNew)
router.post('/dynamics/getCountDoctorCategoryNewOrganization',  CountDoctorCategoryNew.getCountDoctorCategoryNewOrganization)

// Колл-во свободных вакансий
const CountVacanciesCategoryNew = require('../controllers/dynamics/CountVacanciesCategoryNew/CountVacanciesCategoryNew.controllers.js')

router.get('/dynamics/getCountVacanciesCategoryNew',  CountVacanciesCategoryNew.getCountVacanciesCategoryNew)
router.post('/dynamics/getCountVacanciesCategoryNewOrganization',  CountVacanciesCategoryNew.getCountVacanciesCategoryNewOrganization)

// Кол-во уволенных
const CountTurnoverCategoryNew = require('../controllers/dynamics/CountTurnoverCategoryNew/CountTurnoverCategoryNew.controllers.js')

router.get('/dynamics/getCountTurnoverCategoryNew',  CountTurnoverCategoryNew.getCountTurnoverCategoryNew)
router.post('/dynamics/getCountTurnoverCategoryNewOrganization',  CountTurnoverCategoryNew.getCountTurnoverCategoryNewOrganization)
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------
//! МИНТРУДp

// API FRONT 
const routes_mintrud_front_curator = require('../controllers/mintrud/front_curator/mintrud_front_curator.routers'); 
router.use('/mintrud_curator',routes_mintrud_front_curator)

// API SERVICE
const routes_mintrud_service = require('../controllers/mintrud/service/mintrud_service.routers'); 
router.use('/mintrud/service',routes_mintrud_service)
// --------------------------------------------------------------------------------------------------------------------------------------------------------


module.exports = router
