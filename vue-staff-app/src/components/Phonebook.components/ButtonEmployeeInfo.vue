<template>
  <div>
    <b-button class="is-primary" @click="openModal">{{ buttonText }}</b-button>
    <b-modal v-model="isModalOpen" :title="modalTitle" class="modal">
    <div class="modal-content">

      <header class="modal-header">
        <h2 class="modal-title">{{ modalTitle }}</h2>
        <button class="modal-close" @click="isModalOpen = false">
          <i class="fas fa-times"></i>
        </button>
      </header>

      <section class="modal-body">
        <div v-if="data">

          <b-field label="ФИО" horizontal>
            <p class="modal-text">{{ data.full_name }}</p>
          </b-field>

          <b-field label="Дата рождения" horizontal>
            <p class="modal-text">{{ data.birth_date }}</p>
          </b-field>

          <b-field label="Организация" horizontal>
            <p class="modal-text">{{ data.organization_name }}</p>
          </b-field>

          <b-field label="Рабочий телефон" horizontal>
            <p class="modal-text" v-if="!data.phone_work">отсутсвует</p>
            <p class="modal-text">{{ data.phone_work }}</p>
          </b-field>

          <b-field label="Мобильный телефон" horizontal>
            <p class="modal-text" v-if="!data.phone_personal">отсутсвует</p>
            <p class="modal-text">{{ data.phone_personal }}</p>
          </b-field>



        </div>
      </section>

    </div>
  </b-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import K from "@/lib";

const isModalOpen = ref(false);

const buttonText = "Подробнее";
const modalTitle = "Информация о сотруднике";

const props = defineProps({
  id: {
    type: Number,
  }
});

const data = ref(null);
const isLoading = ref(true)

const openModal = async () => {
  isModalOpen.value = true;

  try {
    const url = '/phonebook/getEmployeeInfo'
    isLoading.value = true
    const response = await axios.get(K.API_URL + url, { params: { id: props.id } });
    data.value = response.data;
    isLoading.value = false
  } catch (error) {
    console.error(error);
  }
};


</script>

<style scoped>
.modal {
  font-family: 'Montserrat', sans-serif;
}

.modal-content {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.modal-close {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
  color: #999;
  transition: all 0.3s ease;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-text {
  text-align:left;
  margin: 0;
  font-size: 24px;
  color: #333;
}
</style>
