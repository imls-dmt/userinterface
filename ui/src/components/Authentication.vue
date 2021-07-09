<template>
  <router-link :to="{ name: 'LoginTest' }">
    <span v-if="working">
      <span class="spinner-border spinner-border-sm"></span>
    </span>
    <span v-else>
      <span v-if="loggedin">{{username}}</span>
      <img alt="Login/logout" src="@/assets/person.png" class="login" />
      <span v-if="loggedin">Logout</span>
      <span v-else>Login</span>
    </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Authentication",
  computed: {
    ...mapGetters([
      'working',
      'loggedin',
      'username',
  ])
},
  watch: {
    working(newValue, oldValue) {
      console.log(`working has changed`);
      console.log(oldValue);
      console.log(newValue);
    }
  }
};
</script>

<style scoped>
img {
  width: 30px;
  vertical-align: middle;
}

a {
  font-size: small;
}
</style>
