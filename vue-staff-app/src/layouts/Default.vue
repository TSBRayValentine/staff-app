<template>
  <div>
    <section class="is-fullheight">
      <div class="hero-head">
        <section
          style="width: 100%; overflow-x: auto"

        >
          <b-navbar>
            <template #brand>
              <b-navbar-item style="color:rgb(255, 255, 255)" tag="router-link" :to="{ name: 'home' }">
                Главное меню
              </b-navbar-item>
            </template>

            <template #start>
  

              <b-navbar-item tag="router-link" to="/dynamics">
                Динамика
              </b-navbar-item>
              <b-navbar-item  tag="router-link" to="/kpi"> KPI </b-navbar-item>
              <b-navbar-item tag="router-link" to="/phonebook">
                Телефонный справочник
              </b-navbar-item>
              <b-navbar-item tag="router-link" to="/mintrud_curator">
                Минтруд
              </b-navbar-item>
              <b-navbar-item tag="router-link" to="/vacation">
                График отпусков
              </b-navbar-item>

              <b-navbar-item tag="router-link" to="/birthday_bot">
                БОТ Дня Рождения
              </b-navbar-item>



              <b-navbar-item tag="router-link" to="/salary_statistics">
                Статистика по окладам
              </b-navbar-item>




            </template>
          </b-navbar>
        </section>
      </div>

      <div class="hero-body" style="align-items: flex-start; padding: 0px">
        <slot />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Default",
  methods: {},

  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped></style>
