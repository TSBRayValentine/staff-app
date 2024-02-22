<template>
  <div class="box">


      <div class="box">
        <div class="content">
          <h2> Статистика по окладам </h2>
          <h3> Задача </h3>
          <p>
            Используя информацию о заработной плате сотрудников в внешней БД сформировать таблицу с итоговой отчетностью
            по ряду показателей для каждой организации.
            Также реализовать проверку полноты заполнения полей, необходимых для вычисления.

          </p>

          <h3> Описание работы </h3>

          <p>
            В разделе отображается таблица с необходимой вычисленной на сервере информацией. Также обображается таблица с
            полнойтой заполнения полей каждой организацией.
          </p>

        </div>
      </div>

      <b-field grouped>


        <b-field class="box">
          <TableSettings v-model="tableSettings" />
        </b-field>


        <b-field class="box">
          <ButtonResetSort v-model="resetSortKey" />
        </b-field>

      </b-field>



    <b-field class="box">
      <TableGetSalaryStatisticsTotal :tableSettings.sync="tableSettings" :resetSortKey="resetSortKey" />
    </b-field>





  </div>
</template>

<script setup>

import TableSettings from "@/components/Basic/TableSettings.vue";

import ButtonGetDownloadFile from "@/components/Basic/ButtonGetDownloadFile.vue";
import ButtonResetSort from "../Basic/ButtonResetSort.vue";
import TableGetSalaryStatisticsTotal from "./TableGetSalaryStatisticsTotal.vue";


// Импорт функций
import { ref } from "vue";


// Настройки таблицы
const tableSettings = ref(undefined);

// Сброс сортировки 
const resetSortKey = ref(undefined)


</script>


