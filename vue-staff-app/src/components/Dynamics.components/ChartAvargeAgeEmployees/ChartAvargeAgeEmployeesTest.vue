<template>

  <div>
    <div >
      <apexchart v-if="series" :width="configOption.width" :height="configOption.height" type="line" :options="options" :series="series"></apexchart>
    </div>
  </div>
  
  
  </template>
  
  <script setup>
  
  import K from "@/lib";
  import axios from "axios";
  
  import { ref, onMounted, watch } from "vue";
  
  const isLoading = ref(true)
  
  import configOption from '../conf'
  
  // Получение инфомрации об организации
  const props = defineProps({
  
  organization: {
    type: Array,
    default: () => []
  },
  
  GroupCategory:{
    type: Array,
    default: () => []
  }
  
  });
  
  
  // Функция загрузки данных
  const getCountEmployees = async () => { 
    let result = {};
    let API = ''
    isLoading.value = true;
  
    if (props.organization.length != 0) {
      API = 'dynamics/getAvargeAgeEmployeesTestOrganization'      
  
      result = await axios.post(K.API_URL + API, { data: {organization: props.organization, groupcategory: props.GroupCategory} });
  
      options.value = {
        ...options.value, ...{
          title: { text: `| Средний возраст для выбранных организаций | (${props.organization.length}) |`, }
        }
      }
    }
    else {
      API = 'dynamics/getAvargeAgeEmployeesTest'
      result = await axios.post(K.API_URL + API, { data: { groupcategory: props.GroupCategory} });
  
      options.value = {
        ...options.value, ...{
          title: { text: `| Средний возраст для всех организаций |`, }
        }
      }
    }
  
  
  
    options.value = {
      ...options.value, ...{
        xaxis: {
          categories: result.data.categories
        },
  
      }
    }
  
    series.value = result.data.series
  };
  
  
  
  
  //Загрузка при загрузке страницы
  onMounted(async () => await getCountEmployees());
  
  
  watch(() => props.organization, async (newOrganization) => {
    await getCountEmployees();
  });
  
  watch(() => props.GroupCategory, async (newOrganization) => {
    await getCountEmployees();
  });
  
  
  
  const series = ref()
  const options = ref({
  chart: {
  
    type: 'line',

    toolbar: {
      show: true
    }
  },
  
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: configOption.title,
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: [ ],
    labels: {
      format: 'dd/MM/yyyy',
    },
    tickPlacement: 'on',
    type: 'datetime',

  },

})
  
  
  
  
  </script>
  