<template>
  <div>
    <b-button class="is-primary" @click="openModal">{{ buttonText }} </b-button>

    <b-modal v-model="isModalOpen" :title="modalTitle" class="modal">
      <div class="modal-content">
        <header class="modal-header">
          <h2 class="modal-title">{{ modalTitle }}</h2>
        </header>

        <section class="modal-body">
          <b-notification
            type="is-danger"
            v-model="errorFormat.null"
            :closable="false"
          >
            Все поля должны быть заполнены
          </b-notification>
          <b-notification
            type="is-danger"
            v-model="errorFormat.email"
            :closable="false"
          >
            Почта не соответствует нужному формату "test@test.test"
          </b-notification>

          <div>
            <b-field label="ФИО" horizontal>
              <b-input class="modal-text" v-model="employeeLocal.full_name">
              </b-input>
            </b-field>
         
            <b-field label="Дата рождения" horizontal>
    

              <b-datepicker
                v-model="employeeLocal.birth_date"
                :show-week-number="false"
                locale="ru-RU"
                placeholder="Нажмите для выбора"
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field label="Email" horizontal>
              <b-input class="modal-text" v-model="employeeLocal.email">
              </b-input>
            </b-field>

  
          </div>
        </section>

        <footer class="modal-foot" style="justify-content: flex-end">
          <b-button class="button is-primary" @click="updateSelectEmployee"
            >Обновить</b-button
          >
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import K from "@/lib";

const isModalOpen = ref(false);

const emit = defineEmits(["edit"]);

const buttonText = "Редактировать";
const modalTitle = "Информация о сотруднике";

const props = defineProps({
  employee: Object,
});

const employeeLocal = ref({});

const isLoading = ref(true);

const openModal = async () => {
  isModalOpen.value = true;

  employeeLocal.value.birth_date = new Date(props.employee.birth_date);
  employeeLocal.value.email = props.employee.email;
  employeeLocal.value.employee_id = props.employee.employee_id;

  employeeLocal.value.full_name = props.employee.full_name;
  employeeLocal.value.respect = props.employee.respect;
};

const errorFormat = ref({
  date: false,
  null: false,
  email: false,
});

const updateSelectEmployee = async () => {
  try {
    isLoading.value = true;

    let regex;
    const obj = {
      birth_date: employeeLocal.value.birth_date.toString(),
      email: employeeLocal.value.email.toString(),
      full_name: employeeLocal.value.full_name.toString(),
    };

    for (let key in obj) {
      if (obj[key].trim() === "") {
     
        errorFormat.value.null = true;
      } else {
        errorFormat.value.null = false;
      }
    }

    regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(employeeLocal.value.email)) {
      errorFormat.value.email = false;
    } else {
      errorFormat.value.email = true;
    }

    // Проверяем, что хотя бы один ключ имеет значение true
    const hasTrueValue = Object.values(errorFormat.value).some(
      (value) => value === true
    );

    if (hasTrueValue) {
      return;
    }

    const url = "/birthday_bot/updateSelectEmployee";
    await axios.post(K.API_URL + url, employeeLocal.value);
    emit("edit", true);
    isModalOpen.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.modal {
  font-family: "Montserrat", sans-serif;
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

.modal-body {
  margin-bottom: 20px;
}

.modal-text {
  text-align: left;
  margin: 0;

  color: #333;
}
</style>
