<template>
  <div>
    <b-field label="Управление">
      <b-button type="is-primary" icon-right="plus" @click="modalActive = !modalActive">
      Создать задачу</b-button>
    </b-field>
  
    <b-modal :active="modalActive" has-modal-card>
      <div class="modal-card">
        
        <header class="modal-card-head">
          <p class="modal-card-title">Создание новой задачи</p>
        </header>

        <section class="modal-card-body">

          <b-field label="Задача">
            <b-input v-model="goal.goal" type="textarea" placeholder="Введите задачу" maxlength="200"></b-input>
          </b-field>

          <b-field>
            <b-field label="Квартал">
              <b-select v-model="goal.quarter" placeholder="Выберите квартал">
                <option value="1">1 квартал</option>
                <option value="2">2 квартал</option>
                <option value="3">3 квартал</option>
                <option value="4">4 квартал</option>
              </b-select>
            </b-field>

            <b-field label="Год">
              <b-select v-model="goal.year" placeholder="Выберите год">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </b-select>
            </b-field>
          </b-field>
        </section>

        <footer class="modal-card-foot" style="justify-content: flex-end">
          <b-field v-if="!goal.goal | !goal.year | !goal.quarter" type="is-danger" message="Заполните все поля">
          </b-field>
          <b-button class="button is-white" @click="onClose">Закрыть окно</b-button>
          <b-button :disabled="(!goal.goal | !goal.year | !goal.quarter) ? true : false" class="button is-primary"
            :loading="loading" @click="createGoal">Создать</b-button>



        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import K from "@/lib";

export default {
  props: [],

  data() {
    return {
      modalActive: false,
      loading: false,
      goal: {
        goal: "",
        organizations_id: [],
        quarter: undefined,
        year: undefined,
      },
    };
  },

  async mounted() {
    await this.loadOrganizations();
  },

  computed: {},

  methods: {
    response() {
      this.$emit("response", {
        response: true,
      });
    },
    async loadOrganizations() {
      const res = await K.axios().get(K.API_URL + "organizations/show");

      if (res.status === 200) {
        if (res.data.data.length) {
          for (const item of res.data.data) {
            this.goal.organizations_id.push(item.id);
          }
        }
      } else if (res.status >= 400 && res.status < 404) {
        K.cleanStorageData();
        this.$router.push({ name: res.data.url ? res.data.url : "login" });
      }
      return K.toast(res.data.message, res.data.type);
    },

    async createGoal() {
      const body = {
        goal: this.goal.goal,
        organizations_id: this.goal.organizations_id,
        quarter: this.goal.quarter,
        year: this.goal.year,
      };
      this.loading = true;

      try {
        await axios.post(K.API_URL + "kpi/createGoal", body);
        console.log("Задача создана");
        this.response();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.onClose();
      }
    },

    onClose() {
      this.modalActive = false;
    },
  },
};
</script>
