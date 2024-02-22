<template>
  <div>
    <apexchart v-if="series" :width="configOption.width" :height="configOption.height" type="bar" :options="options" :series="series"></apexchart>
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
}

});


// Функция загрузки данных
const getCountEmployees = async () => { 
  let result = {};
  let API = ''
  isLoading.value = true;

  if (props.organization.length != 0) {
    API = 'dynamics/getCountDisableCategoryNewOrganization'      

    result = await axios.post(K.API_URL + API, { data: props.organization });

    options.value = {
      ...options.value, ...{
        title: { text: `| Кол-во инвалидов для выбранных организаций | (${props.organization.length}) |`, }
      }
    }
  }
  else {
    API = 'dynamics/getCountDisableCategoryNew'
    result = await axios.get(K.API_URL + API);

    options.value = {
      ...options.value, ...{
        title: { text: `| Кол-во инвалидов для всех организаций |`, }
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



const series = ref()
const options = ref({
  chart: {
    type: 'bar',
 
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: false
    },


  },
  title: {
    text: 'Общее кол-во сотрудников'
  },

  theme: {
    mode: 'light',
    palette: 'palette4',
 
  },



  grid: {
    padding: {
      left: 30, // or whatever value that works
      right: 30 // or whatever value that works
    }
  },

  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    },
  },
  xaxis: {
    labels: {
      format: 'dd/MM/yyyy',
    },
    tickPlacement: 'on',
    type: 'datetime',

    categories: [],
  },

  fill: {
    opacity: 1
  }

})




</script>
