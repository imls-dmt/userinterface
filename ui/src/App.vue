<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <hr />
  <Footer></Footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  margin-bottom: 4px;
  margin-top: 3px;
}

h3 {
  margin-top: 3px;
  margin-bottom: 0px;
}

.blog-item {
  display: flex;
  flex-direction: column;
}

.blog-date {
  font-size: x-small;
  padding: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.blog-content {
  padding: 0px 30px 10px;
  flex: 1 1 200px;
}
</style>
