<template>
  <b-field label="Выбор человека">
    <section style="width: 700px">
      <b-autocomplete
        v-model="name"
        :data="filteredDataArray"
        field="full_name"
        :open-on-focus="true"
        @select="
          (option) => {
            selected = option;
            emit('change', selected);
          }
        "
        clearable
      >
      </b-autocomplete>
    </section>
  </b-field>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import K from "@/lib";

import axios from "axios";

const isLoading = ref();
const autocompleteData = ref();

const name = ref("");

const selected = ref();

const emit = defineEmits(["change"]);

// Функция для загрузки данных для выбора сотрудника

const getEmployees = async () => {
  isLoading.value = true;
  try {
    const url = "birthday_bot/getEmployees";
    const response = await axios.get(K.API_URL + url);
    autocompleteData.value = response.data;
    isLoading.value = false;
  } catch (e) {
    console.log(
      `|| birthday_bot || ОШИБКА || Загрузка данных для b-autocomplete || ${e} ||`
    );
  }
};

const filteredDataArray = computed(() => {
  if (autocompleteData.value) {
    return autocompleteData.value.filter((option) => {
      return (
        option.full_name
          .toString()
          .toLowerCase()
          .indexOf(name.value.toLowerCase()) >= 0
      );
    });
  } else {
    return autocompleteData.value;
  }
});

onMounted(async () => {
  await getEmployees();
});
</script>
