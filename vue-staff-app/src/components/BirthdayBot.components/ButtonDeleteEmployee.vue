<template>
  <div>
    <b-button class="is-primary" @click="deleteSelectEmployee()">
      Удалить
    </b-button>
  </div>
</template>

<script setup>
import { ref,defineEmits, defineProps } from "vue";
import K from "@/lib";

import axios from "axios";

const isLoading = ref();

const props = defineProps({
  employee_id: Number,
});

// Функция для загрузки данных для выбора сотрудника

const deleteSelectEmployee = async () => {
  isLoading.value = true;
  try {
    const url = "birthday_bot/deleteSelectEmployee";
    await axios.get(K.API_URL + url, {
      params: { employee_id: props.employee_id },
    });
    emit("delete", true);
    isLoading.value = false;
  } catch (e) {
    console.log(e);
  }
};

const emit = defineEmits(["delete"]);
</script>
