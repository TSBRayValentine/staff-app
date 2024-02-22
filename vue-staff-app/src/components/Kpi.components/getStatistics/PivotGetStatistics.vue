<template>
  <div class="box">

    <div class="box">
      <div class="content">
        <h2> KPI </h2>
        <h3> Задача </h3>
        <p>
          Учет выполнения задач направленых для исполнения в организации.
        </p>

        <h3> Описание работы </h3>

        <p>
          В разделе реализован функционал для создания задач за определенный квартал/год; Формирования отчета о выполнении
          в
          формате excel; Изменения статуса выполнения задачи
        </p>
      </div>
    </div>

    <b-field grouped>

      <b-field class="box">
        <Filters v-model="filters" />
      </b-field>

      <b-field class="box">
        <TableSettings v-model="tableSettings" />
      </b-field>

      <b-field v-if="filters.quarter && filters.year" class="box">
        <ButtonGetDownloadFile :queryString="filters" :url="'http://localhost:5000/api/kpi/getStatisticsExcel'"> Загрузить
          отчет в формате Excel </ButtonGetDownloadFile>
      </b-field>
    </b-field>


    <b-field>
      <getStatistics v-if="filters.quarter && filters.year && activeTab == 0" :activeTab="activeTab"
        :tableSettings.sync="tableSettings" :filters="filters" />
    </b-field>

  </div>
</template>

<script>
import Filters from "@/components/Kpi.components/Basic/Filters.vue";
import TableSettings from "@/components/Kpi.components/Basic/TableSettings.vue";
import getStatistics from "@/components/Kpi.components/getStatistics/getStatistics.vue";
import ButtonGetDownloadFile from "../../Basic/ButtonGetDownloadFile.vue";


export default {
  props: ['activeTab'],
  components: {
    Filters,
    getStatistics,
    TableSettings,
    ButtonGetDownloadFile,
  },

  methods: {

    update() {
      this.isUpdate = !this.isUpdate

    }
  },

  data() {
    return {
      filters:
      {
        quarter: undefined,
        year: undefined
      },

      tableSettings: undefined,
    };
  },

};
</script>

<style>
.option {

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}
</style>