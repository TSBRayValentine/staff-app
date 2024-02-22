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
        <SelectOrganizationsIOGV v-model="organization_id" />
      </b-field>

      <b-field class="box">
        <TableSettings v-model="tableSettings" />
      </b-field>
    </b-field>

    <b-field v-if="activeTab == 2" class="box">
      <getGoalsOrganization :tableSettings.sync="tableSettings" :organization_id="organization_id" />
    </b-field>
  </div>
</template>

<script>
import getGoalsOrganization from "@/components/Kpi.components/getGoalsOrganization/getGoalsOrganization.vue";
import SelectOrganizationsIOGV from "@/components/Basic/SelectOrganizationsIOGV.vue";
import TableSettings from "../Basic/TableSettings.vue";

export default {
  props: ["activeTab"],
  components: {
    getGoalsOrganization,
    SelectOrganizationsIOGV,
    TableSettings,
  },

  data() {
    return {
      data: [],
      isEmpty: true,
      loading: false,
      organization_id: undefined,
      tableSettings: undefined,
    };
  },
};
</script>
