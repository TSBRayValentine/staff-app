<template>
  <section>
    <b-autocomplete
      v-model="selected"
      :data="filteredData"
      field="name"
      :keep-first="true"
      clearable
      placeholder="Год"
      :open-on-focus="true"
      :loading="loading"
      @select="
        (option) => {
          emitData(option);
        }
      "
    >
    </b-autocomplete>
  </section>
</template>

<script type="text/javascript">
export default {
  methods: {
    emitData(option) {
      if (option) {
        this.$emit("input", option);
      } else {
        this.$emit("input", option);
      }
    },
  },

  data: () => ({
    selected: "",
    data: [
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
    ],
    loading: false,
  }),

  computed: {
    filteredData() {
      if (this.selected !== null) {
        return this.data.filter((option) => {
          return (
            option
              .toString()
              .toLowerCase()
              .indexOf(this.selected.toLowerCase()) >= 0
          );
        });
      } else {
        return this.data;
      }
    },
  },
};
</script>
