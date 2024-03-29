

# Информационная система "STAFF-APP"

### Автор проекта: Григорьев Алексей

## Описание проекта

Данный проект является демонстрационной версией использующейся в работе организации системы для автоматизации задач в сфере кадровой политики.

Данная система находится у администраторов организации, у которой существуют дочерние организации в подчинении.

"STAFF-APP" является вспомогательной системой, то есть использует данные из внешней БД системы, специализирующейся на ведении электронного кадрового документооборота в сфере кадровой политики.

В проекте представлены несколько разделов:

•	Динамика

•	KPI

•	Бот Дня Рождения

•	Телефонный справочник

•	Статистика по окладам

•	Минтруд

## Установка

### Docker
Необходимо в корне проекта запустить командную строку и выполнить команду 
```
 docker-compose up -d
```
### В режиме разработчика 
Подробно описано в readme.md каталогов express-staff-app и vue-staff-app

## Техническое описание проекта

### Frontend:
•	VUE js 

•	NGINX 

•	Buefy 

### Backend:
•	Express js

##	Описание разделов

### Динамика

#### Задача

Формирование графиков, демонстрирующих развитие различных показателей кадровой статистики с течением времени.

Например - средний возраст, кол-во сотрудников, кол-во уволенных и другие статистические показатели

#### Описание работы

С заданной периодичностью на сервере происходит загрузка исходных данных о сотрудниках из внешней базы данных в автоматизированном режиме по API запросу.

После загрузки приложение производит агрегацию основных показателей с целью увеличения скорости построения графиков, при изменении настроек отображения графиков.

Это реализованно с помощью "Кэш" таблиц, которые хранят вычисленные после загрузки информации данные.

### KPI

#### Задача

Учет выполнения задач направленых для исполнения в организации.

#### Описание работы

В разделе реализован функционал для создания задач за определенный квартал/год; Формирования отчета о выполнении в формате excel; Изменения статуса выполнения задачи

### График отпусков

#### Задача

Вычисление и отображение информации об отпусках сотрудников.

#### Описание работы

С помощью запросов к внешней БД приложение получает необходимые данные и вычисляет необходимые показатели, формируя таблицу. Также присутсвует возможность выгрузки отчета в формате excel

### Бот Дня Рождения

#### Задача

Выбор определенных сотрудников для занесения их в список тех, кому необходлимо присылать поздравительную открытку.
Данная информация уже будет использована для работы бота, например в телеграмме.

#### Описание работы

В рабочей версии системы данные о сотрудниках загружаются из внешней БД. В данном случае информация о них находится в БД системы "STAFF-APP".
В разделе можно заносить в таблицу выбранных сотрудников, удалять их из списка и производить редактирования информации о сотрудниках.

### Телефонный справочник

#### Задача

Отображение списка сотрудников, реализация поиска по фио и номеру телефона, предоставлять подробную контактную информацию о найденном сотруднике.

#### Описание работы

В разделе существует таблица с списком всех сотрудников, полями для поиска и кнопками для отображения подробной информации для выбранного сотрудника

### Минтруд

#### Задача

Данный раздел необходим для автоматизации сбора данных от организаций для формирования отчетной формы для Минтруда.

#### Описание работы

В разделе существует возможность выбора организации для вывода таблицы и дальнейшего заполнения необходимых данных.

### Статистика по окладам

#### Задача

Используя информацию о заработной плате сотрудников в внешней БД сформировать таблицу с итоговой отчетностью по ряду показателей для каждой организации. Также реализовать проверку полноты заполнения полей, необходимых для вычисления.

#### Описание работы

В разделе отображается таблица с необходимой вычисленной на сервере информацией. Также отображается таблица с полнотой заполнения полей каждой организацией.

