<template>
  <div class="container is-fluid">
    <div class="box">


      <b-table
        :data="filteredTableData"
        :loading="isLoading"
        bordered
        sort-icon="arrow-up"
        sort-icon-size="is-small"
        striped
        hoverable
      >
        <b-table-column field="full_name" label="ФИО" centered v-slot="props">
            {{ props.row.full_name }}
        </b-table-column>
        <b-table-column field="department_full_path" label="Структурное подразделение" centered v-slot="props">
            {{ props.row.department_full_path }}
        </b-table-column>
        <b-table-column field="position_name" label="Должность" centered v-slot="props">
            {{ props.row.position_name }}
        </b-table-column>
        <b-table-column field="date_start" label="Начало периода" centered v-slot="props">
            {{ props.row.date_start }}
        </b-table-column>
        <b-table-column field="date_end" label="Конец периода" centered v-slot="props">
            {{ props.row.date_end }}
        </b-table-column>
        <b-table-column field="days_experience" label="Дней по должности" centered v-slot="props">
            {{ props.row.days_position }}
        </b-table-column>
        <b-table-column field="days_experience" label="Дней по выслуге" centered v-slot="props">
            {{ props.row.days_experience }}
        </b-table-column>     
        <b-table-column field="days_abnormal" label="За ненормированный рабочий день" centered v-slot="props">
            {{ props.row.days_abnormal }}
        </b-table-column>
        <b-table-column field="days_total" label="Всего дней за период" centered v-slot="props">
            {{ props.row.days_total }}
        </b-table-column>
        <b-table-column field="days_balance" label="Остаток дней" centered v-slot="props">
            {{ props.row.days_balance }}
        </b-table-column>




      </b-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import K from "@/lib";
const isLoading = ref(true);

const props = defineProps({
 
  nameFilter: {
    type: String,
    default: ""
  }
})


// Загрузка данных для таблицы
const tableData = ref();

const lodaData = async () => {
  try {
    isLoading.value = true;
    const result = await axios.get(K.API_URL + "vacation/getVacation");
    tableData.value = result.data;
  } catch (error) {
    console.log(error);
    return;
  } finally {
    isLoading.value = false;
  }
};


onMounted(async () => {
  await lodaData();
});


const filteredTableData = computed(() => {
  let filteredData = tableData.value;
  if (props.nameFilter) {
    filteredData = filteredData.filter((item) =>
      item.full_name.toLowerCase().includes(props.nameFilter.toLowerCase())
    );
  }
  return filteredData;
});

</script>

<style scoped>
:deep(tr.is-info) {
  background: #d5ffbd !important;
}

:deep(.b-table .table td) {
  vertical-align: middle;
}

:deep(.level) {
  justify-content: flex-end;
}

:deep(.input) {
  text-align: center;
}

.edit-field {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  justify-content: flex-end;
}

.edit-field-item {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
