<template>
  <b-tabs
    class="block has-background-light"
    style="width: 100%"
  >
  <b-tab-item label="Сводный отчет по окладам">
      <GetSalaryStatistics  />
    </b-tab-item>

    <b-tab-item label="Полнота заполнения окладов">
      <GetSalaryInfo />
    </b-tab-item>



  </b-tabs>
</template>

<script>
import GetSalaryInfo from "./getSalaryInfo/GetSalaryInfo.vue";
import GetSalaryStatistics from "./getSalaryStatistics/GetSalaryStatistics.vue";

export default {
  components: {
    GetSalaryInfo,
    GetSalaryStatistics
  },
 
};
</script>

<style scoped>

</style>
