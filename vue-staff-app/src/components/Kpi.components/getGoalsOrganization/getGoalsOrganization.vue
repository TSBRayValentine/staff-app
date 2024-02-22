<template>
  <div>
    <div v-if="isLoading">
      Загрузка данных...
      <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>

    <b-message
      v-if="organization_id && isEmpty"
      title="Оповещение"
      type="is-info"
      has-icon
      :closable="false"
    >
      В данный момент не создано ни одной задачи.
    </b-message>

    <b-message
      v-if="!organization_id"
      title="Оповещение"
      type="is-info"
      has-icon
      :closable="false"
    >
      Выберите организацию
    </b-message>

    <b-table
      v-if="organization_id && !isEmpty"
      :paginated = "tableSettings.isPaginated"
      :pagination-rounded="true"
      pagination-position="top"
      :per-page="tableSettings.countPages"
      :data="data"
      bordered
      :loading="isLoading"
    >
      <h1 class="title" v-if="!tableSettings.isPaginated">
        Список задач выбранной организации
      </h1>

      <template v-slot:top-left>
        <div class="title">Список задач выбранной организации</div>
      </template>

      <b-table-column
        field="goal"
        searchable
        :custom-search="searchGoal"
        label="Задача"
      >
        <template v-slot:searchable="props">
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Поиск в столбце..."
            size="is-small"
          />
        </template>

        <template v-slot="props">
          <div class="left-align goal">
            {{ props.row.kpi_goal.goal }}
          </div>
        </template>
      </b-table-column>

      <b-table-column field="year" searchable label="Год">
        <template v-slot:searchable="props">
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Поиск в столбце..."
            size="is-small"
          />
        </template>

        <template v-slot="props">
          <span class="tag is-primary">
            {{ props.row.year }}
          </span>
        </template>
      </b-table-column>

      <b-table-column field="quarter" searchable label="Квартал">
        <template v-slot:searchable="props">
          <b-input
            v-model="props.filters[props.column.field]"
            placeholder="Поиск в столбце..."
            size="is-small"
          />
        </template>

        <template v-slot="props">
          <span class="tag is-primary">
            {{ props.row.quarter }}
          </span>
        </template>
      </b-table-column>

      <b-table-column field="status" label="Статус" v-slot="props" width="50px">
        <div class="status">
          <b-icon
            icon="times"
            class="has-background-danger has-text-primary-light"
            v-if="!props.row.status"
          />
          <b-icon 
            icon="check"
            class="has-background-success has-text-success-light"
            v-if="props.row.status"
          />
        </div>
      </b-table-column>

      <b-table-column
        field="error_description"
        label="Описание ошибки"
        v-slot="props"
      >
        <div class="error-description">
          {{ props.row.error_description }}
        </div>
      </b-table-column>

      <b-table-column
        field="edit"
        label="Действия"
        v-slot="props"
        width="100px"
      >
        <ButtonEditGoal
          :getGoalsOrganization="getGoalsOrganization"
          :id_goal="props.row.id"
          :error_description_start="props.row.error_description"
          :status_start="props.row.status"
        />
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import K from "@/lib";

import ButtonEditGoal from "@/components/Kpi.components/getGoalsOrganization/ButtonEditGoal.vue";

export default {
  props: ["organization_id", "tableSettings"],
  components: {
    ButtonEditGoal,
  },

  watch: {
    organization_id: {
      handler: async function () {
        if (this.organization_id != undefined) {
          await this.getGoalsOrganization();
        }
      },
    },
  },

  methods: {
    async getGoalsOrganization() {
      this.isLoading = true;
      this.isEmpty = false;
      try {
        const res = await axios.get(K.API_URL + "kpi/getGoalsOrganization", {
          params: { organization_id: this.organization_id },
        });
        this.data = res.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.data[0] ? (this.isEmpty = false) : (this.isEmpty = true);
        this.isLoading = false;
      }
    },

    searchGoal(row, input) {
      return row.kpi_goal.goal.toLowerCase().includes(input.toLowerCase());
    },
  },

  async mounted() {
    if (this.organization_id) {
      await this.getGoalsOrganization();
    }
  },

  computed: {},

  data() {
    return {
      data: [],
      isEmpty: true,
      isLoading: false,
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

:deep(.goal) {
  text-align: left;
  word-wrap: break-word;
  height: max-content;
  white-space: normal;
  font-size: 1rem;
  font-weight: 600;
}

:deep(.error-description) {
  text-align: left;
  word-wrap: break-word;
  height: max-content;
  white-space: normal;
  font-size: 1rem;
}

:deep(.status) {
  font-size: 2rem;
}
:deep(.icon) {
  height: 2rem;
  width: 2rem;
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
