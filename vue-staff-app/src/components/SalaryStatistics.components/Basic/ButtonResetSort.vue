<template>
  <b-field label="Настройка сортировок" grouped>
      <b-button class="is-primary" @click="resetSortKey = new Date().toLocaleString()">
        Очистить сортировки
      </b-button>
  </b-field>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";

const emit = defineEmits(["input"]);
const resetSortKey = ref(undefined);

onUpdated(() => emit("input", resetSortKey));
onMounted(() => emit("input", resetSortKey));
</script>
