import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'


import './styles/style.scss'

// -------------------------------------------------------------------------------------------------
//! Иконки

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: "sm",
        "is-small": "1x",
        "is-medium": "2x",
        "is-large": "3x"
      },
      iconPrefix: ""
    }
  }
})
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
//! Настройки графиков

import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

window.Apex.colors =["#FF3D47", "#FFA200", "#006D7A", "#00B8AC", "#79D43A", "#FF8C6D", "#FF6B00", "#3F5B64"] 

window.Apex.chart = {
  defaultLocale: 'en',
  locales: [{
    name: 'en',
    options: {
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      shortDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      toolbar: {
        download: 'Скачать SVG',
        selection: 'Выделение',
        selectionZoom: 'Масштабирование выделенной области',
        zoomIn: 'Увеличить',
        zoomOut: 'Уменьшить',
        pan: 'Перемещение',
        reset: 'Сбросить масштаб',
      },
    }
  }]
}
// -------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------
//! Разделы 


import Home from '@/components/Home.vue'
import DefaultLayout from '@/layouts/Default.vue'

// Вакансии
import MainVacation from '@/components/Vacation.components/MainVacation.vue'

// KPI
import Kpi from '@/components/Kpi.components/KpiPivot.vue'

// БОТ Дня Рождения
import MainBirthdayBot from '@/components/BirthdayBot.components/MainBirthdayBot.vue'

// Телефонный справочник
import MainPhonebook from '@/components/Phonebook.components/MainPhonebook.vue'

// Статистика по окладам
import MainSalaryStatistics from '@/components/SalaryStatistics.components/MainSalaryStatistics.vue'

// Динамика
import MainDynamics from '@/components/Dynamics.components/MainDynamics.vue'

// Минтруд кураторов
import MintrudMain from '@/components/Mintrud.controllers/MintrudMain.vue'

// ----------------------------------------------------------------------------------------


Vue.component("default-layout", DefaultLayout)

Vue.use(VueRouter);

const routes = [
  {
    name: "vacation",
    path: "/vacation",
    component: MainVacation,
   },
  {
    name: "kpi",
    path: "/kpi",
    component: Kpi,
   
  },
  {
    name: "birthday_bot",
    path: "/birthday_bot",
    component: MainBirthdayBot,
   
  },
  {
    name: "phonebook",
    path: "/phonebook",
    component: MainPhonebook,
   
  },

  {
    name: "salary_statistics",
    path: "/salary_statistics",
    component: MainSalaryStatistics,
   
  },
  {
    name: "dynamics",
    path: "/dynamics",
    component: MainDynamics,
   
  },
  {
    name: "mintrud_curator",
    path: "/mintrud_curator",
    component: MintrudMain,
   
  },
  {
    path: "/",
    component: Home,
    name: "home",
   
  },
  
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {

    next(); // Продолжаем нормальную навигацию

});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

