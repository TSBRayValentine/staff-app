<template>
  <div class="box">


      <div class="box">
        <div class="content">
          <h2> График отпусков </h2>

          <h3> Задача </h3>
          <p>
            Вычисление и отображение информации об отпусках сотрудников.
          </p>

          <h3> Описание работы </h3>

          <p>
            С помощью запросов к внешней БД приложение получает необходимые данные и вычисляет необходимые показатели,
            формируя таблицу.
            Также присутсвует возможность выгрузки отчета в формате excel
          </p>
        </div>
      </div>

      <b-field grouped>

        <b-field label="Поиск по ФИО" class="box">
          <b-input v-model="nameFilter" class="filter-input"></b-input>
        </b-field>

        <b-field class="box" label="Экспорт данных" grouped>
          <a :href="`http://localhost:5000/api/vacation/downloadVacationExcel`">
            <b-button type="is-primary">
              <b-icon icon="download"></b-icon>

              <span>
                <slot> Загрузить файл EXCEL </slot>
              </span>
            </b-button>
          </a>

        </b-field>

      </b-field>
   

    <div>


      <div>
        <TableVacation :nameFilter="nameFilter" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TableVacation from "./TableVacation.vue";


import { ref } from "vue";


// переменная для фильтра по ФИО
const nameFilter = ref("");

</script>

<style scoped>
.menu {
  display: flex;
}

.menu-item {
  margin-right: 10px;
}
</style>
