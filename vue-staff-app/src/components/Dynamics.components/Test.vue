<template>
  <section>
    <p class="content"><b>Выбор организации</b></p>
    <b-dropdown v-model="selectedOptions" @input="updateSelectedData" multiple aria-role="list" style="dropdown">
      <template slot="trigger">
        <b-button type="is-primary" icon-right="menu-down">
          Выбранно организаций ({{ selectedOptions.length }})
        </b-button>
      </template>

      <b-input v-model="searchText" placeholder="Поиск организации" type="text" aria-role="searchbox"></b-input>

      <b-dropdown-item v-for="option in filteredOptions" :key="option.id" :value="option.id" aria-role="listitem">
        <span>{{ option.name }}</span>
      </b-dropdown-item>

    </b-dropdown>

    <b-button @click="resetOptions" aria-role="listitem" >
      <span>Сброс выбранных организаций</span>
    </b-button>
  </section>
</template>

<script>
import axios from 'axios';
import K from "@/lib";

export default {
  data() {
    return {
      selectedOptions: [],
      selectedData: [],
      searchText: '',
      options: [],
    };
  },

  computed: {
    filteredOptions() {
      if (this.searchText) {
        return this.options.filter(option =>
          option.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        return this.options;
      }
    },
  },

  methods: {
    resetOptions() {
      this.selectedOptions = [];
      this.selectedData = [];
      this.updateSelectedData()
    },

    updateSelectedData(value) {
      if (value) {
        this.selectedData = value.map(id => {
        const option = this.options.find(option => option.id === id);
        return { id: option.id, name: option.name };
      });

      this.$emit('input', this.selectedData);
      }
      else {
        this.$emit('input', []);
      }
    },
  },

  async mounted() {
    try {
      const API = 'organizations/show';
      const response = await axios.get(K.API_URL + API);
      this.options = response.data.data;

    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  },
};
</script>

<style scoped>
.dropdown{
  margin-right: 10px;
}
</style>