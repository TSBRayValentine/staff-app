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
        <TableSettings v-model="tableSettings" :count_page_list="[20, 30, 40, 50]" />
      </b-field>

      <b-field class="box">
        <ButtonResetSort v-model="resetSortKey" />
      </b-field>

    </b-field>

    <b-field class="box">
      <TableGetSalaryInfo :resetSortKey="resetSortKey" :tableSettings.sync="tableSettings" :key="isUpdate" />
    </b-field>

  </div>
</template>

<script>

import TableSettings from "@/components/Basic/TableSettings.vue";
import TableGetSalaryInfo from "./TableGetSalaryInfo.vue";
import ButtonResetSort from "../Basic/ButtonResetSort.vue";



export default {
  components: {
    TableGetSalaryInfo,
    TableSettings,
    ButtonResetSort
  },
  methods: {
    response() {
      this.isUpdate = !this.isUpdate
    }
  },

  async mounted() {

  },

  data() {
    return {
      isUpdate: false,
      test: undefined,
      tableSettings: undefined,
      resetSortKey: undefined
    };
  },
};
</script>
<style></style>
