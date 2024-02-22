<template>
  <b-field label="Фильтры поиска" grouped>
    <b-field class="is-primary" label="Квартал">
      <div class="select is-rounded">
        <select style="width: 150px" class="mySelect" v-model="filters.quarter">
          <option value="1">1 квартал</option>
          <option value="2">2 квартал</option>
          <option value="3">3 квартал</option>
          <option value="4">4 квартал</option>
        </select>
      </div>
    </b-field>

    <b-field label="Год">
      <div class="select is-rounded">
        <select style="width: 150px" class="mySelect" v-model="filters.year">
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>
    </b-field>
  </b-field>
</template>

<script setup>
import { reactive, onUpdated, onMounted } from "vue";

const emit = defineEmits(["input"]);
const filters = reactive({
  quarter: undefined,
  year: undefined,
});

const date = new Date();
filters.year = date.getFullYear();

const month = date.getMonth();
if (month < 3) filters.quarter = 1;
else if (month < 6) filters.quarter = 2;
else if (month < 9) filters.quarter = 3;
else if (month < 12) filters.quarter = 4;

onUpdated(() => emit("input", filters));
onMounted(() => emit("input", filters));
</script>

<style>
.mySelect {
  text-align-last: center;
}
</style>
