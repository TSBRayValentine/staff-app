<template>
  <b-field label="Настройки таблицы" grouped>
    <b-field label="По страницам">
      <b-switch v-model="tableSettings.isPaginated" placeholder="Выберите год">
      </b-switch>
    </b-field>
    <b-field label="Кол-во строк">
      <div class="select is-rounded">
        <select v-model="tableSettings.countPages" placeholder="Выберите год">
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </b-field>
  </b-field>
</template>

<script setup>
import { reactive, onUpdated, onMounted } from "vue";

const emit = defineEmits(["input"]);
const tableSettings = reactive({
  isPaginated: true,
  countPages: 15,
});

onUpdated(() => emit("input", tableSettings));
onMounted(() => emit("input", tableSettings));
</script>
