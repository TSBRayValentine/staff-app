<template>
  <div>
    <div v-if="isLoading">
      Загрузка данных...
      <b-skeleton size="is-small" :active="isLoading"></b-skeleton>
    </div>

    <div class="table-container" v-if="!isLoading">
      <b-table
        
        :key="resetSortKey"
        :paginated="tableSettings.isPaginated"
        :pagination-rounded="true"
        pagination-position="top"
        :per-page="tableSettings.countPages"
        :data="data.data"
        bordered
        :loading="isLoading"
      >
        <h1 class="title" v-if="!tableSettings.isPaginated">
          Отчёт
        </h1>

        <template v-slot:top-left>
          <div class="title">Отчёт</div>
        </template>

        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <!-- Должности -->
        <b-table-column
          field="organization_name"
          searchable
          style="text-align: left"
          label="Наименование организации"
        >
          <template v-slot:searchable="props">
            <b-input
              v-model="props.filters[props.column.field]"
              placeholder="Поиск в столбце..."
              size="is-small"
            />
          </template>

          <template v-slot="props">
            <div class="left-align goal">
              {{ props.row.organization_name }}
            </div>
          </template>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Всего должностей -->
        <b-table-column
          class=""
          field="all_count"
          label="Количество должностей"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.all_count" class="">
              {{ props.row.all_count }}
            </span>
            <span v-else class=""> отсутствует </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Минимальный оклад -->
        <b-table-column
          field="min_salary"
          label="Минимальный оклад"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.min_salary" class="">
              {{ props.row.min_salary }}
            </span>
            <span v-else class=""> отсутствует </span>
          </div>
        </b-table-column>

        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Максимальный оклад -->
        <b-table-column
          field="max_salary"
          label="Максимальный оклад"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.max_salary" class="">
              {{ props.row.max_salary }}
            </span>
            <span v-else class=""> отсутствует </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей с минимальным окладом -->
        <b-table-column
          field="count_position_min"
          label="Кол-во должностей с минимальным окладом"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_min" class="">
              {{ props.row.count_position_min }}
            </span>
            <span v-else class=""> 0 </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей с максимальным окладом -->
        <b-table-column
          field="count_position_max"
          label="Кол-во должностей с максимальным окладом"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_max" class="">
              {{ props.row.count_position_max }}
            </span>
            <span v-else class=""> 0 </span>
          </div>
        </b-table-column>

        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во окладов средний диапазон -->
        <b-table-column
          field="count_position_other"
          label="Кол-во Иных (средний)"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_other" class="">
              {{ props.row.count_position_other }}
            </span>
            <span v-else class=""> 0 </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей без данных -->
        <b-table-column
          field="count_whitout_data"
          label="Кол-во должностей без данных"
   
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span
              v-if="
                props.row.count_whitout_minmax ||
                props.row.count_whitout_salary_units
              "
              class=""
            >
              {{ props.row.count_whitout_data }}
            </span>
            <span v-else class=""> 0 </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей без вилки -->
        <b-table-column
          field="count_position_equal"
          label="Кол-во должностей без вилки"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_equal" class="">
              {{ props.row.count_position_equal }}
            </span>
            <span v-else class=""> 0 </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей некорректно заполненных -->
        <b-table-column
          field="count_position_incorrect"
          label="Кол-во должностей с некорректно заполненными окладами"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_incorrect" class="">
              {{ props.row.count_position_incorrect }}
            </span>
            <span v-else class=""> 0 </span>
          </div>
        </b-table-column>

        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей с минимальным окладом % -->
        <b-table-column
          field="count_position_min_percent"
          label="Кол-во должностей с минимальным окладом %"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_min_percent" class="">
              {{ props.row.count_position_min_percent + "%" }}
            </span>
            <span v-else class=""> 0% </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей с максимальным окладом % -->
        <b-table-column
          field="count_position_max_percent"
          label="Кол-во должностей с максимальным окладом %"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_max_percent" class="">
              {{ props.row.count_position_max_percent + "%" }}
            </span>
            <span v-else class=""> 0% </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей с средним окладом % -->
        <b-table-column
          field="count_position_other_percent"
          label="Кол-во Иных (средний) %"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_other_percent" class="">
              {{ props.row.count_position_other_percent + "%" }}
            </span>
            <span v-else class=""> 0% </span>
          </div>
        </b-table-column>

        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей без данных  % -->
        <b-table-column
          field="count_whitout_data_percent"
          sortable
          label="Кол-во должностей без данных %"
          v-slot="props"
        >
          <div class="table-center">
            <span
              v-if="
                props.row.count_whitout_minmax ||
                props.row.count_whitout_salary_units
              "
              class=""
            >
              {{ props.row.count_whitout_data_percent + "%" }}
            </span>
            <span v-else class=""> 0% </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей без вилки -->
        <b-table-column
          field="count_position_equal_percent"
          label="Кол-во должностей без вилки %"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_equal_percent" class="">
              {{ props.row.count_position_equal_percent + "%" }}
            </span>
            <span v-else class=""> 0% </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <!-- Кол-во должностей некорректно заполненных % -->
        <b-table-column
          field="count_position_incorrect_percent"
          label="Кол-во должностей с некорректно заполненными окладами %"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span v-if="props.row.count_position_incorrect_percent" class="">
              {{ props.row.count_position_incorrect_percent + "%" }}
            </span>
            <span v-else class=""> 0% </span>
          </div>
        </b-table-column>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------->
      </b-table>
    </div>
  </div>
</template>

<script setup>
// Импорт функций
import { ref, onMounted } from "vue";

import axios from "axios";
import K from "@/lib";

//Пропсы
const props = defineProps({
  tableSettings: {
    default: () => {
      return { isPaginated: true, countPages: 15 };
    },
  },
  resetSortKey: {
    default: () => {
      return undefined;
    },
  }

});



// Загрузка данных
const isLoading = ref(false);

const data = ref();

const getSalaryStatisticsTotal = async () => {
  const url = "/salary_statistics/getSalaryStatisticsTotal";
  isLoading.value = true;

  const res = await axios.get(K.API_URL + url);
  data.value = res.data;
  isLoading.value = false;
};

onMounted(async () => {
  await getSalaryStatisticsTotal();
});

</script>

<style scoped>
.my1 {
  background-color: red;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.table-center {
  font-size: 1rem;
  font-weight: 600;
}

:deep(table td) {
  text-align: center;
  vertical-align: middle;
}

:deep(.b-table .table th) {
  text-align: center;
  vertical-align: middle;
}

:deep(.goal) {
  text-align: left;
  word-wrap: break-word;
  height: max-content;
  white-space: normal;
  font-size: 0.8rem;
  font-weight: 600;
}

:deep(.b-table .table th .th-wrap) {
  text-align: center;
  justify-content: space-around;
  font-weight: 700;
  font-size: 1rem;
}
</style>
