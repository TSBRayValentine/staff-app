<template>
  <div class="main" style="display: flex;">

    <b-sidebar position="static" fullheight type="is-light" open>
      <b-menu class="is-custom-mobile">
        <b-menu-list>
          <b-menu-item @click="tab = 1" label="Общие"></b-menu-item>
          <b-menu-item label="Стаж" @click="tab = 2"></b-menu-item>
          <b-menu-item label="Возраст" @click="tab = 3"></b-menu-item>
          <b-menu-item label="Образование" @click="tab = 4"></b-menu-item>
          <b-menu-item label="Укомплектованность" @click="tab = 5"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </b-sidebar>
    <div>

      <!-- Выбор организации -->
      <div class="options-container">
        <SelectOrganizationsNew v-model="organizationNew" />
      </div>
      <b-taglist class="options-container">
        <b-tag type="is-info" v-for="item in organizationNew" :key="item.id">{{ item.name }}</b-tag>
      </b-taglist>

      <!-- Выбор группы-категории -->
      <div class="options-container">
        <SelectGroupCategory v-model="GroupCategory" />
      </div>

      <b-taglist class="options-container">
        <b-tag type="is-success" v-for="item in GroupCategory" :key="item.id">{{ item.name }}</b-tag>
      </b-taglist>


      <div v-if="!GroupCategory.length">
        <b-notification :closable="false" type="is-warning" has-icon>
          <span class="icon">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
          <span>Для отображения некоторых графиков необходимо выбрать группу-категорию и организации</span>
        </b-notification>
      </div>



      <div>
        <!-- Вкладка Общие -->
        <div class="chart" v-if="tab == 1">

          <!-- Общее кол-во сотрудников по категориям -->
          <div class="card">
            <ChartCountEmployesNew :organization="organizationNew" />
          </div>

          <!-- По полу ГГС -->
          <div v-if="GroupCategory.length && organizationNew.length" class="card">

            <ChartPopulationTEST :organization="organizationNew" :group-category="GroupCategory" />
          </div>



          <!-- По инвалидам -->
          <div class="card">
            <ChartCountDisableCategoryNew :organization="organizationNew" />
          </div>
        </div>

        <!-- Вкладка Стаж -->
        <div class="chart" v-if="tab == 2">

          <!-- Стаж общий-->
          <div v-if="GroupCategory.length" class="card">
            <ChartCountEmployeesStageCommonTest :group-category="GroupCategory" :organization="organizationNew" />
          </div>

          <!-- Стаж в организации-->
          <div v-if="GroupCategory.length" class="card">
            <ChartCountEmployeesStageNew :group-category="GroupCategory" :organization="organizationNew" />
          </div>


        </div>

        <!-- Вкладка возраст -->
        <div class="chart" v-if="tab == 3">

          <!-- Средний возраст по категориям -->
          <div class="card">
            <ChartAvargeAgeEmployeesCategoryNew :organization="organizationNew" />
          </div>

          <!-- По возрасту -->
          <div v-if="GroupCategory.length" class="card">
            <ChartCountEmployeesAgesTest :organization="organizationNew" :group-category="GroupCategory" />
          </div>

          <!-- Средний возраст -->
          <div v-if="GroupCategory.length" class="card">
            <ChartAvargeAgeEmployeesTest :organization="organizationNew" :group-category="GroupCategory" />
          </div>



        </div>

        <!-- Вкладка образование -->
        <div class="chart" v-if="tab == 4">
          <!-- Красный диплом -->
          <div class="card">
            <ChartCountWithHonorsCategoryNew :organization="organizationNew" />
          </div>
          <!-- Кандидаты -->
          <div class="card">
            <ChartCountCandidateCategoryNew :organization="organizationNew" />
          </div>
          <!-- Доктора наук -->
          <div class="card">
            <ChartCountDoctorCategoryNew :organization="organizationNew" />
          </div>

        </div>

        <!-- Вкладка Укомплектованность -->
        <div class="chart" v-if="tab == 5">

          <!-- Кол-во свободных вакансий -->
          <div class="card">
            <ChartCountVacanciesCategoryNew :organization="organizationNew" />
          </div>

          <!-- Кол-во уволеных -->
          <div class="card">
            <ChartCountTurnoverCategoryNew :organization="organizationNew" />
          </div>
        </div>



      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

//Выбор организации
import SelectOrganizationsNew from "./Options/SelectOrganizationsNew.vue";

import SelectGroupCategory from "./Options/SelectGroupCategory.vue";


// динамика мен жен
import ChartPopulationTEST from "./ChartPopulationTEST/ChartPopulationTEST.vue";


// Средний возраст
import ChartAvargeAgeEmployeesTest from "./ChartAvargeAgeEmployees/ChartAvargeAgeEmployeesTest.vue";


// Средний возраст по категориям
import ChartAvargeAgeEmployeesCategoryNew from "./ChartAvargeAgeEmployees/ChartAvargeAgeEmployeesCategoryNew.vue";
// Общий стаж
import ChartCountEmployeesStageCommonTest from "./ChartCountEmployeesStage/ChartCountEmployeesStageCommonTest.vue";


// По стажу в организации
import ChartCountEmployeesStageNew from "./ChartCountEmployeesStage/ChartCountEmployeesStageNew.vue";



// По возрасту
import ChartCountEmployeesAgesTest from "./ChartCountEmployeesAges/ChartCountEmployeesAgesTest.vue";

// общее кол-во новое
import ChartCountEmployesNew from "./ChartCountEmployes/ChartCountEmployesNew.vue"



// Кол-во инвалидов
import ChartCountDisableCategoryNew from "./ChartCountDisableCategory/ChartCountDisableCategoryNew.vue"


// Кол-во красный диплом
import ChartCountWithHonorsCategoryNew from "./ChartCountWithHonorsCategory/ChartCountWithHonorsCategoryNew.vue"

// Кол-во кандидатов наук
import ChartCountCandidateCategoryNew from "./ChartCountCandidateCategory/ChartCountCandidateCategoryNew.vue"

// Кол-во докторов наук
import ChartCountDoctorCategoryNew from "./ChartCountDoctorCategory/ChartCountDoctorCategoryNew.vue"

// Кол-во докторов наук
import ChartCountVacanciesCategoryNew from "./ChartCountVacanciesCategory/ChartCountVacanciesCategoryNew.vue"

// Кол-во уволенных
import ChartCountTurnoverCategoryNew from "./ChartCountTurnoverCategory/ChartCountTurnoverCategoryNew.vue"


// номер вкладки 
const tab = ref(1)

const organizationNew = ref([])
const GroupCategory = ref([])



let period = ref();
let resetPeriod = ref(true);

const emitPeriod = (value) => {
  period.value = value;
  resetPeriod.value = false;
};

const emitResetPeriod = (value) => {
  resetPeriod.value = true;
};
</script>

<style scoped>
.chart {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-radius: 50%;
}

.card {
  /* flex-basis: calc(1% - 20px); */
  margin: 10px;
  padding: 5px;


}

.options-container {
  margin: 10px;

}
</style>
