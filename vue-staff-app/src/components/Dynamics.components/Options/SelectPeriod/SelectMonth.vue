<template>
  <section>
    <b-autocomplete
      v-model="selected"
      :data="filteredData"
      field="name"
      :keep-first="true"
      clearable
      placeholder="Месяц"
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
    data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
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
