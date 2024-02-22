<template>
  <div class="box">
  

      <div class="box">
        <div class="content">
          <h2> Минтруд </h2>
          <h3> Задача </h3>
      <p>
        Отображение списка сотрудников, реализация поиска по фио и номеру телефона, предоставлять подробную контактную
        информацию о найденном сотруднике.
      </p>

      <h3> Описание работы </h3>

      <p>
        В разделе существует таблица с списокм всех сотрудников, полями для поиска и кнопками для оборажения подробной
        информации для выбранного сотрудника
      </p>
        </div>
      </div>


      <b-field class="box">
        <SelectOrganizations v-model="organization" />
      </b-field>
     
   

    <div v-if="!organization.organization_id">
      <b-notification :closable="false" type="is-warning" has-icon>
        <span class="icon">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
        <span>Для отображения таблицы выберите организацию</span>
      </b-notification>
    </div>

    <div v-if="organization.organization_id">
      <MintrudTable :organization_id="organization.organization_id" />
    </div>
  </div>
</template>

<script setup>
import MintrudTable from "./MintrudTable.vue";

import SelectOrganizations from "../Basic/SelectOrganizations.vue";

import { ref, onMounted } from "vue";

const organization = ref({
  organization_id: undefined,
  organization_name: undefined,
});
</script>

<style scoped>
.menu {
  display: flex;
}
.menu-item {
  margin-right: 10px;
}
</style>
