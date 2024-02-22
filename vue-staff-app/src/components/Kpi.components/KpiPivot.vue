
<template>
  <b-tabs class="block has-background-light" style="width: 100%" v-model="activeTab">

    <b-tab-item label="Сводный отчет о выполнении задач">
      <PivotGetStatistics :activeTab="activeTab" />
    </b-tab-item>

    <b-tab-item label="Создание задачи">
      <PivotGetAllGoals />
    </b-tab-item>

    <b-tab-item label="Учёт ошибок">
      <PivotGetGoalsOrganization :activeTab="activeTab" />
    </b-tab-item>


  </b-tabs>
</template>

<script>

import PivotGetGoalsOrganization from "@/components/Kpi.components/getGoalsOrganization/PivotGetGoalsOrganization.vue";
import PivotGetAllGoals from "@/components/Kpi.components/getAllGoals/PivotGetAllGoals.vue";
import PivotGetStatistics from "@/components/Kpi.components/getStatistics/PivotGetStatistics.vue";


export default {
  components: {
    PivotGetGoalsOrganization,
    PivotGetAllGoals,
    PivotGetStatistics,
  },


  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>


<style scoped>
/* :deep(button){
  border-radius: 12px;
  background-color: red;
} */
</style>