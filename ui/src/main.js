import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
//import Vue from "vue";
//import axios from "axios";
import App from "./App.vue";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";

import About from "./components/About.vue";
import Contribute from "./components/Contribute.vue";
import Home from "./components/Home.vue";
import Search from "./components/Search.vue";
import Support from "./components/Support.vue";
import Resource from "./components/Resource.vue";
import ResourceEdit from "./components/ResourceEdit.vue";
import ResourceCreate from "./components/ResourceCreate.vue";

import Survey from "./components/Survey.vue";
import SurveyResults from "./components/SurveyResults.vue";
import Login from "./components/Login.vue";
import Blog from "./components/Blog.vue";
import Profile from "./components/Profile.vue";
//import VueCookies from "vue-cookies";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/contribute", name: "Contribute", component: Contribute },
    { path: "/search", name: "Search", component: Search },
    { path: "/support", name: "Support", component: Support },
    {
      path: "/resource/:id",
      name: "Resource",
      component: Resource,
      props: true,
    },
    {
      path: "/resource-edit/:id",
      name: "ResourceEdit",
      component: ResourceEdit,
      props: true,
    },
    {
      path: "/resource-create",
      name: "ResourceCreate",
      component: ResourceCreate,
      props: false,
    },
    {
      path: "/survey/:id",
      name: "Survey",
      component: Survey,
      props: true,
    },
    {
      path: "/survey-result/:id",
      name: "SurveyResults",
      component: SurveyResults,
      props: true,
    },
    //{ path: "/login", name: "Login", component: Login },
    { path: "/blog", name: "Blog", component: Blog },
    { path: "/login", name: "Login", component: Login },
    { path: "/profile", name: "Profile", component: Profile },
  ],
});

const app = createApp(App);
app.use(router);
app.use(store);
//app.use(axios);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

// add global properties that will be used across components
// https://v3.vuejs.org/api/application-config.html#globalproperties
app.config.globalProperties.$searchResult = {}; // the current search result JSON object
app.config.globalProperties.$currentSearch = {}; // the current search JSON object
app.config.globalProperties.$searchHistory = []; // the search history array with new search JSON  prepended at index 0
app.config.globalProperties.$apiBase = "https://www.dmtc-devel.org";
//app.config.globalProperties.$loginStatus = {}; // login status
//app.config.globalProperties.$loginUser = ""; // logged in user
