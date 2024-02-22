<template>
  <div>
    <b-message
      v-if="data.isEmpty"
      title="Оповещение"
      type="is-info"
      has-icon
      :closable="false"
    >
      В данный момент не создано ни одной задачи.
    </b-message>

    <div v-if="isLoading">
      Загрузка данных...
      <progress class="progress is-small is-primary" max="100"></progress>
    </div>

    <b-table
      v-if="!data.isEmpty"
      :key = "resetSortKey"
      :paginated="tableSettings.isPaginated"
      :pagination-rounded="true"
      pagination-position="top"
      :per-page="tableSettings.countPages"
      :data="data.data"
      bordered
      :loading="isLoading"
      default-sort="organization_name"
    >
      <h1 class="title" v-if="!tableSettings.isPaginated">Список всех задач</h1>

      <template v-slot:top-left>
        <div class="title">Список всех задач</div>
      </template>

      <b-table-column
        field="organization_name"
        searchable
        
        :custom-search="searchGoal"
        style="text-align: left"
        label="Организация"
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
            {{ props.row.name }}
          </div>
        </template>
      </b-table-column>

      <b-table-column sortable field="total_salaries" label="Всего должностей" v-slot="props">
        <div class="table-center">
          <span class="tag is-success">
            {{ props.row.total_salaries }}
          </span>
        </div>
      </b-table-column>

      <b-table-column
        field="min_salary"
        label="Минимальный оклад"
        sortable
        v-slot="props"
      >
        <div class="table-center">
          <span
          :class="
          ClassFormatter(props.row.total_salaries,props.row.min_salary,props.row.max_salary) 
        "
          >
            {{ props.row.min_salary }}
          </span>
        </div>
      </b-table-column>

      <b-table-column
        field="max_salary"
        label="Максимальный оклад"
        sortable
        v-slot="props"
      >
        <div class="table-center">
          <span
          :class="
          ClassFormatter(props.row.total_salaries,props.row.min_salary,props.row.max_salary) 
        "
          >
            {{ props.row.max_salary }}
          </span>
        </div>
      </b-table-column>

      <b-table-column
        field="count_done"
        label="Процент заполнения"
        sortable
        v-slot="props"
      >
        <div class="table-center">
          <span
          :class="
          ClassFormatter(props.row.total_salaries,props.row.min_salary,props.row.max_salary) 
        "
          >
            {{ NumberFormatPercent(props.row.count_done) }}
          </span>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script setup>
// Импорт функций
import { ref, onMounted } from "vue";
import { getApiNew } from "../../../BasicFunction/getApiNew.js";

const ClassFormatter = (count_all, min_salary, max_salary) => {

if (count_all == min_salary || count_all == max_salary ) {
  return 'tag is-success'
}
else if ((count_all - 1) == min_salary || (count_all - 1) == max_salary ) {
  return 'tag is-warning'
}
else {
  return 'tag is-danger'
}

}

//Пагинация таблицы
defineProps({
  tableSettings: {
    default: () => {
      return { isPaginated: true, countPages: 15 };
    },
  },
  resetSortKey: {
    default: () => {
      return undefined;
    },
  },
});

// Загрузка данных
const isLoading = ref(false);

const data = ref({
  data: undefined,
  isEmpty: false,
  isError: false,
});

const getSalaryInfo = async () => {
  const url = "salary_statistics/getSalaryInfo";
  isLoading.value = true;
  data.value = await getApiNew(url);
  isLoading.value = false;
};

onMounted(async () => await getSalaryInfo());

// Настраиваемый поиск
const searchGoal = (row, input) => {
  return row.name.toLowerCase().includes(input.toLowerCase());
};

const NumberFormatPercent = (data) => {
  const result = new Intl.NumberFormat("ru", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(data);
  return result;
};
</script>

<style scoped>
:deep(table td) {
  text-align: center;
  vertical-align: middle;
}

:deep(.tag:not(body)) {
  font-size: 1rem;
}

:deep(.goal) {
  text-align: left;
  word-wrap: break-word;
  height: max-content;
  white-space: normal;
  font-size: 1rem;
  font-weight: 600;
}

:deep(.left-align) {
  text-align: left;
}

:deep(.b-table .table th .th-wrap) {
  display: flex;
  justify-content: center;
  font-size: 1rem;

  flex-direction: column;
  align-items: stretch;
}

:deep(.b-table .table th) {
  text-align: center;
  vertical-align: middle;
}
</style>
