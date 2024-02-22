<template>
  <div>
    <b-button type="is-primary" icon-left="edit" @click="modalActive = !modalActive"></b-button>
    <b-modal  style="text-align: left;" :active="modalActive" has-modal-card>
      <div class="modal-card">

        <header class="modal-card-head">
          <p class="modal-card-title">Редактирование задачи</p>
        </header>

        <section class="modal-card-body">
          <b-field label="Задача выполнена?">
            <b-switch v-model="status">

            </b-switch>
          </b-field>

          <b-field label="Описание ошибки" :type="(!error_description && !status) ? 'is-danger' : undefined"
            :message="(!error_description && !status) ? 'Поле не может быть пустым' : undefined">
            <b-input v-model="error_description" maxlength="200" type="textarea"
              :disabled="status ? 'disabled' : undefined"></b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot" style="justify-content: flex-end;">
          <button class="button is-white" @click="onClose">Закрыть окно</button>
          <button class="button is-primary" :loading="loading" @click="updateGoal" :disabled="!error_description ? 'disabled' : undefined">Сохранить</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>

import axios from 'axios';
import K from "@/lib";

export default {
  props: ['id_goal', 'error_description_start', 'status_start', 'getGoalsOrganization'],

  watch: {
    id_goal:{
      handler: function(){
        this.error_description = this.error_description_start;
        this.status = this.status_start;
      }
    }
  },

  data() {
    return {
      modalActive: false,
      isSwitched: true,
      loading: false,
      error_description: '',
      status: true,
    };
  },

  mounted() {
    this.error_description = this.error_description_start;
    this.status = this.status_start;
  },



  methods: {

    async updateGoal() {
      
      const body = {
        id: this.id_goal,
        status: this.status,
        error_description: this.error_description
      };

      if (this.status){
        body.error_description = ''
      }

      this.loading = true

      try {
        await axios.post(K.API_URL + "kpi/updateGoal", body);
      }
      catch (error) {
        console.log(error)
      }
      finally {
        this.loading = false
        await this.getGoalsOrganization()
        this.onClose()
      }
    },

    onClose() {
      this.modalActive = false;
    }
  }
};
</script>
