<template>
  <section>
    <p class="content"><b>Выбор Группы/категории</b></p>
    <b-dropdown v-model="selectedOptions" @input="updateSelectedData" multiple aria-role="list" style="dropdown">
      <template slot="trigger">
        <b-button type="is-primary">
          Нажать для выбора группы/категории ({{ selectedOptions.length }})
        </b-button>
      </template>

      <b-input v-model="searchText" placeholder="Поиск организации" type="text" aria-role="searchbox"></b-input>

      <b-dropdown-item v-for="option in filteredOptions" :key="option.id" :value="option.id" aria-role="listitem">
        <span>{{ option.name }}</span>
      </b-dropdown-item>

    </b-dropdown>

    <b-button class="dropdown is-danger" @click="resetOptions" aria-role="listitem">
      <span>Сброс выбранных групп-категорий</span>
    </b-button>

    <b-button class="dropdown" @click="selectOptionsAll" aria-role="listitem">
      <span>Выбрать всех</span>
    </b-button>

  

    <b-button class="dropdown" @click="selectOptionsByIds(group_6)" aria-role="listitem">
      <span>Сантехники</span>
    </b-button>


    <b-button class="dropdown" @click="selectOptionsByIds(group_5)" aria-role="listitem">
      <span>Рабочие</span>
    </b-button>

    <b-button class="dropdown" @click="selectOptionsByIds(group_4)" aria-role="listitem">
      <span>Программисты</span>
    </b-button>

    <b-button class="dropdown" @click="selectOptionsByIds(group_3)" aria-role="listitem">
      <span>Инженеры</span>
    </b-button>

    <b-button class="dropdown" @click="selectOptionsByIds(group_2)" aria-role="listitem">
      <span>Дизайнеры</span>
    </b-button>

    <b-button class="dropdown" @click="selectOptionsByIds(group_1)" aria-role="listitem">
      <span>Архитекторы</span>
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
      group_1:[15,16,17],
      group_2:[23,24,25],
      group_3: [12,13,14],
      group_4:[18,19,20,21],
      group_5:[26],
      group_6:[9],
      group_7:[11],
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
      } else {
        this.$emit('input', []);
      }
    },

    selectOptionsByIds(ids) {
      this.selectedOptions = ids;
      this.updateSelectedData(ids);
    },

    selectOptionsAll() {
      this.selectedOptions = this.filteredOptions.map(option => option.id);
      this.updateSelectedData(this.selectedOptions);
    },

  },

  async mounted() {
    try {
      const API = 'getGroupCategory';
      const response = await axios.get(K.API_URL + API);
      this.options = response.data;
      this.selectOptionsAll()
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  },
};
</script>

<style scoped>
.dropdown {
  margin: 5px;
}
</style>
