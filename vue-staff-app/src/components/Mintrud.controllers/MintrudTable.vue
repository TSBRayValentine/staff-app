<template>
  <div class="container is-fluid">
    <div class="box">
      <h1 v-if="!isLoading" class="title is-5">
        {{ tableData[0].organization_name }}
      </h1>

      <b-field class="edit-field">
            <b-button
              class="is-info edit-field-item"
              v-if="!editButton"
              @click="editButton = true"
            >
              Редактировать
            </b-button>

            <b-button
              class="is-success edit-field-item"
     
              v-if="editButton"
              @click="saveData"
            >
              Сохранить
            </b-button>

            <b-button
              class="is-danger edit-field-item"
              v-if="editButton"
              @click="editButton = false"
            >
              Отменить
            </b-button>
          </b-field>
          
      <b-table
        :data="tableData"
        :loading="isLoading"
        bordered
        sort-icon="arrow-up"
        sort-icon-size="is-small"
        striped
        hoverable
      >
        <template v-slot:footer>
          <b-field class="edit-field">
            <b-button
              class="is-info edit-field-item"
              v-if="!editButton"
              @click="editButton = true"
            >
              Редактировать
            </b-button>

            <b-button
              class="is-success edit-field-item"
     
              v-if="editButton"
              @click="saveData"
            >
              Сохранить
            </b-button>

            <b-button
              class="is-danger edit-field-item"
              v-if="editButton"
              @click="editButton = false"
            >
              Отменить
            </b-button>
          </b-field>
        </template>

        <b-table-column
          field="group_category_name"
          label="Группа-категория"
          v-slot="props"
          width="200"
        >
          <div>
            {{ props.row.group_category_name }}
          </div>
        </b-table-column>

  

        <b-table-column
          field="p1"
          label="Пункт 1 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p1"
            type="number"
            centered

          />

          <div v-if="!editButton">
            {{ props.row.p1 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 2 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p2"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p2 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 3 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p3"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p3 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 4 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p4"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p4 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 5 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p5"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p5 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 6 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p6"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p6 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 6.1 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p61"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p61 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 7 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p7"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p7 }}
          </div>
        </b-table-column>

        <b-table-column
          field="p2"
          label="Пункт 8 части 4"
          v-slot="props"
          centered
        >
          <b-input
            v-if="editButton"
            class="input-table"
            v-model.number="props.row.p8"
            type="number"
          />

          <div v-if="!editButton">
            {{ props.row.p8 }}
          </div>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import K from "@/lib";
const isLoading = ref(true);

// Загрузка данных для таблицы
const tableData = ref();

const lodaData = async () => {
  try {
    isLoading.value = true;
    const result = await axios.get(K.API_URL + "mintrud_curator/getDataMintrudOrganization", {params:{organization_id:props.organization_id }});
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

const props = defineProps({
  organization_id: Number,
})

// Редактирование табилцы
const editButton = ref(false);

// Сохранение данных
const saveData = async () => {
  const data = tableData.value.map(obj => {
  return {
    total: obj.total,
    p1: obj.p1,
    p2: obj.p2,
    p3: obj.p3,
    p4: obj.p4,
    p5: obj.p5,
    p6: obj.p6,
    p61: obj.p61,
    p7: obj.p7,
    p8: obj.p8,
    group_category_id: obj.group_category_id


  };
});


  await axios.post(K.API_URL + "mintrud_curator/updateDataOrganization", { data: data, organization_id:props.organization_id });
  editButton.value = false;
};
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
