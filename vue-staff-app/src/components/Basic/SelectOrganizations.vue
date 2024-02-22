<template>
  <b-field label="Выбор организации">
    <section style="width: 700px">
      <b-autocomplete
        v-model="organization_name"
        :data="filteredOrganizations"
        field="name"
        :keep-first="true"
        clearable
        placeholder="Выберите ИОГВ"
        :open-on-focus="true"
        :loading="loading"
        @select="
          (option) => {
            getOrganizationID(option);
          }
        "
      >
      </b-autocomplete>
    </section>
  </b-field>
</template>

<script type="text/javascript">
import K from "@/lib";

export default {
  methods: {
    getOrganizationID(option) {
      if (option) {
        this.$emit("input", {
          organization_id: option.id,
          organization_name: option.name,
        });
      } else {
        this.$emit("input", {
          organization_id: undefined,
          organization_name: undefined,
        });
      }
    },
    async loadOrganizations() {
      if (this.organizations.length === 0) {
        this.loading = true;
        const res = await K.axios().get(K.API_URL + "organizations/show");
        this.loading = false;
        if (res.status === 200) {
          if (res.data.data.length) {
            this.organizations = res.data.data;
          }
        } else if (res.status >= 400 && res.status < 404) {
          K.cleanStorageData();
          this.$router.push({ name: res.data.url ? res.data.url : "login" });
        }
        return K.toast(res.data.message, res.data.type);
      }
    },
  },

  async mounted() {
    await this.loadOrganizations();
  },

  data: () => ({
    organization_name: "",
    organizations: [],
    selected: null,
    loading: false,
  }),

  computed: {
    filteredOrganizations() {
      if (this.organization_name !== null) {
        return this.organizations.filter((option) => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.organization_name.toLowerCase()) >= 0
          );
        });
      } else {
        return this.organizations;
      }
    },
  },
};
</script>
