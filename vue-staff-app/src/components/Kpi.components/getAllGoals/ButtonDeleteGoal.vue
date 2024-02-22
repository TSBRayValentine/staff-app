<template>
  
  <b-button type="is-danger"  icon-left="trash" @click="deleteGoal"/>
  
</template>

<script>
import axios from 'axios';
import K from "@/lib";

export default {
  props: ['id_goal' , 'getAllGoals'],
  
  components: {
  },

  methods: {
    async deleteGoal() {
      const body = {
        id : this.id_goal
      };      
       try {
        await axios.post(K.API_URL + "kpi/deleteGoal", body);
        await this.getAllGoals();
          } catch (error) {
        console.log(error)
      }
    }
  },

  async mounted() {
  },

  computed: {
  },

  data() {
    return {
    };
  },

};
</script>
