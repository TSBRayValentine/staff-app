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
      :paginated = "tableSettings.isPaginated"
      :pagination-rounded="true"
      pagination-position="top"
      :per-page="tableSettings.countPages"
      :data="data.data"
      bordered
      :loading="isLoading"
    >
      <h1 class="title" v-if="!tableSettings.isPaginated">
        Список всех задач
      </h1>

      <template v-slot:top-left>
        <div class="title">Список всех задач</div>
      </template>

      <b-table-column
        field="goal"
        searchable
        :custom-search="searchGoal"
        style="text-align: left"
        label="Задачи"
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
            {{ props.row.goal }}
          </div>
        </template>
      </b-table-column>

      <b-table-column field="year" searchable label="Год">
        <template v-slot:searchable="props">
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Поиск в столбце..."
            size="is-small"
          />
        </template>

        <template v-slot="props">
          <span class="tag is-primary">
            {{ props.row.year }}
          </span>
        </template>
      </b-table-column>

      <b-table-column field="quarter" searchable label="Квартал">
        <template v-slot:searchable="props">
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Поиск в столбце..."
            size="is-small"
          />
        </template>

        <template v-slot="props">
          <span class="tag is-primary">
            {{ props.row.quarter }}
          </span>
        </template>
      </b-table-column>

      <b-table-column field="Delete" label="Удалить" v-slot="props">
        <ButtonDeleteGoal
          :id_goal="props.row.kpi_goal_id"
          :getAllGoals="getAllGoals"
        />
      </b-table-column>
    </b-table>
  </div>
</template>

<script setup>

// Импорт компонентов
import ButtonDeleteGoal from "@/components/Kpi.components/getAllGoals/ButtonDeleteGoal.vue";

// Импорт функций
import { ref, onMounted } from "vue";
import { getApiNew } from "../../../BasicFunction/getApiNew.js";

//Пагинация таблицы
defineProps({
  tableSettings: {      
      default: () => {return {isPaginated: true, countPages: 15 } }
  },

});


// Загрузка данных
const isLoading = ref(false);

const data = ref({
  data: undefined,
  isEmpty: false,
  isError: false,
});

const getAllGoals = async () => {
  const url = "kpi/getAllGoals";
  isLoading.value = true;
  data.value = await getApiNew(url);
  isLoading.value = false;
};

onMounted(async () => await getAllGoals());

// Настраиваемый поиск
const searchGoal = (row, input) => {
  return row.kpi_goal.goal.toLowerCase().includes(input.toLowerCase());
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
