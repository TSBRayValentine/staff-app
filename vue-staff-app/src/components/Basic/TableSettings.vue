<template>
  <b-field label="Настройки таблицы" grouped>

    <b-field label="По страницам">
      <b-switch v-model="tableSettings.isPaginated" placeholder="Выберите год">
      </b-switch>
    </b-field>

    <b-field label="Кол-во строк">
      <div class="select is-rounded">
      <select v-model="tableSettings.countPages" placeholder="Выберите год">
        <option v-for="(item, index) in count_page_list" :key="index"
        :value=item>{{item}}</option>
      </select>
    </div>
    </b-field>

  </b-field>
</template>

<script setup>
import { reactive, onUpdated, onMounted } from "vue";

const props = defineProps({
  count_page_list: {
    type: Array,
    default: () =>{return [15,30,50]} 
  },
});

const emit = defineEmits(["input"]);
const tableSettings = reactive({
  isPaginated: false,
  countPages: props.count_page_list[0],
});

onUpdated(() => emit("input", tableSettings));
onMounted(() => emit("input", tableSettings));

</script>
