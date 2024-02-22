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
        <ButtonCreateGoal @response="response" />
      </b-field>
      <b-field class="box">
        <TableSettings v-model="tableSettings" />
      </b-field>
    </b-field>
    
    <b-field class="box">
      <getAllGoals :tableSettings.sync="tableSettings" :key="isUpdate" />
    </b-field>

  </div>
</template>

<script>

import getAllGoals from "@/components/Kpi.components/getAllGoals/getAllGoals.vue";
import ButtonCreateGoal from "@/components/Kpi.components/getAllGoals/ButtonCreateGoal.vue";
import TableSettings from "../Basic/TableSettings.vue";

export default {
  components: {
    getAllGoals,
    ButtonCreateGoal,
    TableSettings
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
      tableSettings: undefined
    };
  },
};
</script>
<style></style>
