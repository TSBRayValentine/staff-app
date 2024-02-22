<template>
  <div class="box">
    <div>

      <div class="box">
        <div class="content">
          <h2> Бот Дня Рождения </h2>
          <h3> Задача </h3>
          <p>
            Выбор определенных сотрудников для занесения их в список тех, кому необходлимо присылать поздравительную
            открытку.
            Данная инфомрация уже будет использована для работы бота, например в телеграмме.
          </p>

          <h3> Описание работы </h3>

          <p>
            В рабочей версии системы данные о сотрудниках беруться из внешней БД. В данном случае информация о них
            находится в
            БД системы "STAFF-APP".
            В разделе можно заносить в таблицу выбранных сотрудников, удалять их из списка и производить редактирования
            информации о сотрудниках.
          </p>
        </div>
      </div>


      <div class="menu">

        <AutocompleteEmployees  class="box" @change="updateTable" />

        <b-field class="box" label="Добавить пользователя">
          <b-button  class="is-primary" @click="createSelectEmployee">
            Добавить пользователя
          </b-button>
        </b-field>
      </div>

      <!-- Оповещения -->
      <div class="notification-custom">
        <b-notification v-if="isCheck" auto-close type="is-danger" v-model="isCheck"
          aria-close-label="Close notification">
          Сотрудник уже в таблице
        </b-notification>

        <b-notification v-if="isCheckSelected" auto-close type="is-danger" v-model="isCheckSelected"
          aria-close-label="Close notification">
          Выберите сотрудника
        </b-notification>
      </div>

      <div class="box">
        <!-- Таблица -->
        <b-table :data="dataTable" :loading="isLoading" striped bordered sort-icon="arrow-up" sort-icon-size="is-small">
          <b-table-column label="ФИО" v-slot="props" width="200">
            {{ props.row.full_name }}

          </b-table-column>

          <b-table-column field="birth_date" label="Дата рождения" v-slot="props" width="200">
            {{ K.getReportDateNew(props.row.birth_date) }}
          </b-table-column>
          <b-table-column field="email" label="Email" v-slot="props" width="200">
            {{ props.row.email }}
          </b-table-column>

          <b-table-column field="respect" label="Редактирование" v-slot="props" width="200">
            <ButtonEditEmployee :employee="props.row" @edit="getAllEmployees">
            </ButtonEditEmployee>
          </b-table-column>

          <b-table-column label="Удаление" v-slot="props" width="200">
            <ButtonDeleteEmployee :employee_id="props.row.employee_id" @delete="getAllEmployees">
            </ButtonDeleteEmployee>
          </b-table-column>
        </b-table>
      </div>


    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import K from "@/lib";

import axios from "axios";

const isLoading = ref();

import AutocompleteEmployees from "./AutocompleteEmployees.vue";
import ButtonDeleteEmployee from "./ButtonDeleteEmployee.vue";
import ButtonEditEmployee from "./ButtonEditEmployee.vue";

const selectedEmployee = ref();

const updateTable = (selected) => {
  selectedEmployee.value = selected;
};

onMounted(async () => {
  await getAllEmployees();
});

const dataTable = ref();

const isCheck = ref(false);
const isCheckSelected = ref(false);

const createSelectEmployee = async () => {
  try {
    isLoading.value = true;

    // Проверка что сотрудник выбран
    if (!selectedEmployee.value) {
      isCheckSelected.value = true;
      return;
    }

    // Проверка что человек уже есть в табилце
    let url = "";
    let res;
    url = "birthday_bot/checkSelectEmployee";
    res = await axios.get(K.API_URL + url, {
      params: { employee_id: selectedEmployee.value.employee_id },
    });

    if (res.data) {
      isCheck.value = true;
      return;
    }

    // Создание записи о сотруднике в табилце birthday_bot
    url = "birthday_bot/createSelectEmployee";
    await axios.get(K.API_URL + url, {
      params: { employee_id: selectedEmployee.value.employee_id },
    });
  } catch (e) {
    console.log(
      `|| birthday_bot || ОШИБКА || Загрузка данных для b-autocomplete || ${e} ||`
    );
  } finally {
    isLoading.value = false;
  }

  getAllEmployees();
};

const getAllEmployees = async () => {
  isLoading.value = true;
  try {
    const url = "birthday_bot/getAllEmployees";
    const response = await axios.get(K.API_URL + url);
    dataTable.value = response.data;
    isLoading.value = false;
  } catch (e) {
    console.log(
      `|| birthday_bot || ОШИБКА || Загрузка данных для b-autocomplete || ${e} ||`
    );
  }
};
</script>

<style scoped>
.notification-custom {
  position: absolute;
  top: 80px;
  right: 20px;
}

.menu {
  display: flex;
  align-items: baseline;
}

.menu>* {
  margin-right: 10px;
}

:deep(.b-table .table td) {
  text-align: center;
  vertical-align: middle;
}
</style>
