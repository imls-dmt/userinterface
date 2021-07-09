<template>
  <!-- <a href="https://esip-dev-02.edacnm.org/login/"> -->
  <router-link :to="{ name: 'LoginTest' }">
    <img alt="Login" src="@/assets/person.png" class="login" /> Login
  </router-link>
</template>

<script>
export default {
  name: "Authentication",
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
