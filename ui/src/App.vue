<template>
  <div>
    <AppNavbar></AppNavbar>
    <hr />
    <router-view :key="$route.fullPath"></router-view> <!-- https://forum.vuejs.org/t/how-to-reload-component-when-navigating-among-pages-rendered-by-a-same-component/112316-->
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppNavbar from "./components/App-Navbar.vue";
import AppFooter from "./components/App-Footer.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
    AppFooter,
  },
  provide: {
    $appApiBase: "https://www.dmtc-devel.org",
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

.blog-content img {
 float: left;
  padding-right:1em;
  width: 200px;
}

.content img {
 float: left;
  padding-right:1em;
  width: 200px;
}

.content p,h3,h2,h1 {
  clear: both;
}

.content h3,h2,h1 {
  padding-top: 1em
}


.bottom-blocks h1 {
  font-size: 2rem;
}

.bottom-blocks h2 {
  font-size: 1.5rem;
}

.bottom-blocks h3 {
  font-size: 1rem;
}


.emph {
  font-style: italic;
}

.diagnostic {
  display: none;
  font-size: .75em;
  color: black;
  padding: 0px;
  margin: 0px;
}

.alert {
  color: red;
}

.icon {
  height: 30px;
  margin-left: 15px;
  margin-right: 15px;
}

.form-section-head {
  margin-top: 36px;
  padding: 4px;
  padding-left: 12px;
  font-size: xx-large;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  background-color: #ececec;
}

.checkbox-box {
  display: inline;
  margin-right: 18pt;
}

.list-container {
  height: 3em;
}

form {
  overflow: hidden;
}

.form-control-label {
  padding-top: 12px;
}

.form-control {
  width: 95%;
}

input[type="checkbox"] {
  vertical-align: middle;
  position: relative;
  bottom: 1px;
}

.checkbox-option {
  padding-left: 18px;
  text-indent: -18px;
}

.flexiList {
  border: 1px solid black;
  padding: 1em;
}

.flexiList td {
  padding-left: 1em;
  padding-right: 1em;
}

.flexiList th {
  padding-left: 1em;
  padding-right: 1em;
}

.flexiButton {
  margin-top: 6px;
  margin-bottom: 6px;
}

.flexdatalist_checkbox {
  margin-left: 1em;
}
</style>
