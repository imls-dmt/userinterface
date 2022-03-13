<template>
  <div style="display:inline">
  <router-link :to="{ name: 'Login' }">
    <span v-if="working">
      <span class="spinner-border spinner-border-sm"></span>
    </span>
    <span v-else>
      <span v-if="loggedin">Logout <img alt="Login/logout" src="@/assets/person-green.png" class="login" /></span>
      <span v-else>Login <img alt="Login/logout" src="@/assets/person.png" class="login" /></span>
    </span>
  </router-link>
  </div>
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
}

a {
  font-size: small;
}

</style>
