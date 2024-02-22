<template>
  <div class="box">
    <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin">
      </b-icon>
    </b-loading>

    <div v-if="!isLoading">

      <div class="box">
        <div class="content">
          <h2> Телефонный справочник </h2>
          <h3> Задача </h3>
          <p>
            Отображение списка сотрудников, реализация поиска по фио и номеру телефона, предоставлять подробную контактную
            инфомрацию о найденном сотруднике.
          </p>

          <h3> Описание работы </h3>

          <p>
            В разделе существует таблица с списокм всех сотрудников, полями для поиска и кнопками для оборажения подробной
            инфомрации для выбранного сотрудника
          </p>
        </div>
      </div>



      <b-field label="Поиск по ФИО" class="box">
        <b-input v-model="nameFilter"></b-input>
      </b-field>
      <b-field label="Поиск по рабочему телефону" class="box">
        <b-input v-model="phoneFilter"></b-input>
      </b-field>


      <div v-if="tableData" class="box">
        
        <b-table class="myTable" paginated :data="filteredTableData">
          <b-table-column field="full_name" label="ФИО" v-slot="props">
            <div class="table-center">
              <span>{{ props.row.full_name }}</span>
            </div>
          </b-table-column>
          <b-table-column field="phone_work" label="Рабочий телефон" v-slot="props">
            <div class="table-center">
              <span>{{ props.row.phone_work }}</span>
              <span v-if="!props.row.phone_work">отсутсвует</span>
            </div>
          </b-table-column>

          <b-table-column field="organization_name" label="Название организцаии" v-slot="props">
            <div class="table-center">
              <span>{{ props.row.organization_name }}</span>
            </div>
          </b-table-column>


          <b-table-column field="id" label="Информация о сотруднике" v-slot="props">
            <div class="table-center">
              <ButtonEmployeeInfo :id="props.row.id" />
            </div>
          </b-table-column>
        </b-table>
      </div>
    </div>

  </div>
</template>

<script setup>
import axios from "axios"; // Импорт модуля axios для выполнения HTTP-запросов
import { ref, onMounted, computed } from "vue"; // Импорт необходимых функций из Vue
import K from "@/lib"; // Импорт модуля K

import ButtonEmployeeInfo from "./ButtonEmployeeInfo.vue"; // Импорт компонента ButtonEmployeeInfo для отображения информации о сотруднике

// Переменная для хранения данных для таблицы
const tableData = ref(); // Создание переменной для хранения данных таблицы

const isLoading = ref(true); // Переменная для отслеживания состояния загрузки данных

// Функция для загрузки данных для таблицы
const getDataPhonebook = async () => {
  isLoading.value = true; // Установка состояния загрузки в true
  try {
    const url = "phonebook/getDataPhonebook"; // URL для запроса данных
    const response = await axios.get(K.API_URL + url); // Выполнение HTTP-запроса для получения данных
    tableData.value = response.data; // Сохранение полученных данных в переменной tableData
    isLoading.value = false; // Установка состояния загрузки в false после завершения запроса
  } catch (e) {
    console.log(
      `|| PHONEBOOK || ОШИБКА || Загрузка данных для таблицы || ${e} ||`
    ); // Обработка ошибки при загрузке данных
  }
};

// Загрузка данных при открытии страницы
onMounted(async () => {
  await getDataPhonebook(); // Вызов функции загрузки данных при открытии страницы
});

// Фильтрация
const nameFilter = ref(""); // Переменная для хранения значения фильтра по имени
const phoneFilter = ref(""); // Переменная для хранения значения фильтра по номеру телефона

const filteredTableData = computed(() => {
  let filteredData = tableData.value; // Использование вычисляемого свойства для фильтрации данных таблицы
  if (nameFilter.value) {
    filteredData = filteredData.filter((item) =>
      item.full_name.toLowerCase().includes(nameFilter.value.toLowerCase())
    ); // Фильтрация данных по имени
  }

  if (phoneFilter.value) {
    filteredData = filteredData.filter((item) => {
      if (item.phone_work) { // Проверка наличия значения номера телефона
        const phoneNumber = item.phone_work.replace(/\D/g, ""); // Удаление всех символов, кроме цифр, из номера телефона
        const filteredPhoneNumber = phoneFilter.value.replace(/\D/g, ""); // Удаление всех символов, кроме цифр, из значения фильтра
        return phoneNumber.includes(filteredPhoneNumber); // Проверка соответствия номера телефона значению фильтра
      } else {
        return false; // Возвращение false, если номер телефона отсутствует
      }
    });
  }
  return filteredData; // Возврат отфильтрованных данных
});
</script>


<style scoped>
.table-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-box {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* изменено с center на flex-start */
  margin-bottom: 20px;
}

.filter-field {
  margin-right: 20px;
  flex: 1;
}

.filter-input {
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-size: 16px;
  width: 100%;
  transition: all 0.3s ease;
}

.filter-input:focus {
  outline: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

:deep(.b-table .table th .th-wrap) {
  /* text-align: center; */
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.b-table .table th) {
  border: 1px solid #ddd;

}

:deep(.b-table .table td) {
  border: 1px solid #ddd;

  text-align: center;
  vertical-align: middle;
  font-size: 1.1rem;

}
</style>
