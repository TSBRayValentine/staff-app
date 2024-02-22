<template>
  <div class="container is-fluid">
    <div class="box">
      <b-message
        v-if="isEmptyGoal"
        title="Оповещение"
        type="is-info"
        has-icon
        :closable="false"
      >
        Задач на {{ this.filters.year }} год {{ this.filters.quarter }} квартала
        не обнаружено
      </b-message>

      <b-message
        v-if="isEmpty"
        title="Оповещение"
        type="is-info"
        has-icon
        :closable="false"
      >
        В данный момент не создано ни одной задачи
      </b-message>

      <div v-if="isLoading">
        Загрузка данных...
        <progress class="progress is-small is-primary" max="100">15%</progress>
      </div>

      <b-table
        v-if="!isEmptyGoal && !isEmpty && !isLoading"
        default-sort="organization_name"
        defaultSortDirection="asc"
        :paginated="tableSettings.isPaginated"
        :pagination-rounded="true"
        pagination-position="top"
        :per-page="tableSettings.countPages"
        :data="data"
        bordered
        :loading="isLoading"
      >
      <h1 class="title" v-if="!tableSettings.isPaginated">
        Сводный отчет по организациям
      </h1>

        <template v-slot:top-left>
          <div class="title">Сводный отчет по организациям</div>
        </template>
        <b-table-column
          field="organization_name"
          sortable
          searchable
          :custom-search="searchOrganization"
          label="Организация"
        >
          <template v-slot:searchable="props">
            <b-input
              v-model="props.filters[props.column.field]"
              class="search"
              placeholder="Поиск в столбце..."
              size="is-small"
            />
          </template>

          <template v-slot="props">
            <div class="left-align organization">
              {{ props.row.organization_name }}
            </div>
          </template>
        </b-table-column>

        <b-table-column field="goal" label="Всего задач" v-slot="props">
          <div class="table-center">
            <span class="tag is-success">
              {{ props.row.count_all_goals }}
            </span>
          </div>
        </b-table-column>

        <b-table-column
          field="count_done"
          label="Выполнено"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span
              :class="
                props.row.count_all_goals == props.row.count_done
                  ? 'tag is-success'
                  : 'tag is-danger'
              "
            >
              {{ props.row.count_done }}
            </span>
          </div>
        </b-table-column>

        <b-table-column
          field="count_done"
          label="Процент выполнения"
          sortable
          v-slot="props"
        >
          <div class="table-center">
            <span
              :class="
                props.row.count_all_goals == props.row.count_done
                  ? 'tag is-success'
                  : 'tag is-danger'
              "
            >
              {{ getResult(props.row) }}
            </span>
          </div>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import K from "@/lib";

export default {
  props: ["filters", "tableSettings"],

  watch: {
    filters: {
      handler: async function () {
        await this.getStatistics();
      },
      deep: true,
    },
  },

  methods: {
    async getStatistics() {
      this.isLoading = true;
      this.isEmptyGoal = false;
      this.isEmpty = false;

      try {
        const res = await axios.get(K.API_URL + "kpi/getStatistics", {
          params: { quarter: this.filters.quarter, year: this.filters.year },
        });
        this.data = res.data;      
        Number(this.data[0].count_all_goals) == 0
          ? (this.isEmptyGoal = true)
          : (this.isEmptyGoal = false);
      } catch (error) {
        console.log();
      } finally {
        this.data[0] ? (this.isEmpty = false) : (this.isEmpty = true);
        this.isLoading = false;
      }
    },
    searchOrganization(row, input) {
      return row.organization_name.toLowerCase().includes(input.toLowerCase());
    },
    getResult(data) {
      const result = data.count_done / data.count_all_goals;
      const ru = new Intl.NumberFormat("ru", {
        style: "percent",
        minimumFractionDigits: 2,
      }).format(result);
      return ru;
    },
  },

  async created() {
    await this.getStatistics();
  },

  data() {
    return {
      data: [],
      isLoading: false,
      isEmptyGoal: false,
      isEmpty: false,
    };
  },
};
</script>
<style scoped>
:deep(table td) {
  text-align: center;
  vertical-align: middle;
}

:deep(.tag:not(body)) {
  font-size: 1rem;
}

:deep(.organization) {
  text-align: left;
  word-wrap: break-word;
  height: max-content;
  white-space: normal;
  font-size: 1rem;
  font-weight: 600;
}

:deep(.left-align) {
  text-align: left;
}

:deep(.b-table .table th .th-wrap) {
  display: flex;
  justify-content: center;
  font-size: 1rem;

  flex-direction: column;
  align-items: stretch;
}

:deep(.b-table .table th) {
  text-align: center;
  vertical-align: middle;
}
</style>
