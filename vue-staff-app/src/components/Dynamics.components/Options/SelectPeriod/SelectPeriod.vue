<template>
  <div class="flex-container">
    <b-field :type="type" label="Начальная дата" >
      <SelectYears class="margin" v-model="period.minYearMonth.year" />
      <SelectMonth class="margin" v-model="period.minYearMonth.month" />
    </b-field>

    <b-field :type="type" label="Конечная дата">
      <SelectYears class="margin" v-model="period.maxYearMonth.year" />
      <SelectMonth v-model="period.maxYearMonth.month" />
    </b-field>
  </div>
</template>

<script type="text/javascript">
import SelectYears from "./SelectYears";
import SelectMonth from "./SelectMonth";

export default {
  components: {
    SelectYears,
    SelectMonth,
  },

  data: () => ({
    //Проверка заполненности полей
    type: '',
    //настройка временного периода
    period: {
      minYearMonth: {
        year: null,
        month: null,
      },
      maxYearMonth: {
        year: null,
        month: null,
      },
    },
  }),

  methods: {
    emitPeriod() {
      const hasNullValues = Object.values(this.period).some((obj) =>
        Object.values(obj).some((val) => val === null)
      );

      if (hasNullValues) {
        this.type = 'is-danger'
      } else {
        this.$emit("emitPeriod", this.period);
        this.type = ''
      }
    },

    emitResetPeriod() {
        this.$emit("emitResetPeriod", true);
    },

  },

  watch: {
    period: {
      handler: function(newVal, oldVal) {
        const hasNullValues = Object.values(this.period).some((obj) =>
        Object.values(obj).some((val) => val === null)
      );
      if (hasNullValues) { 
        this.type = 'is-danger'
        this.emitResetPeriod()
       
      }
      else{
        this.type = ''
        this.emitPeriod()
      }        

      },
      deep: true
    }
  }


};
</script>


<style scoped>
.flex-container {
  display: flex;
  width: 400px;
}

.margin {
  margin-right: 10px;
}
</style>