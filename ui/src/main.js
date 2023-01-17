import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
//import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";

import PageAbout from "./components/Page-About.vue";
import Contribute from "./components/Page-Contribute.vue";
import PageHome from "./components/Page-Home.vue";
import PageSearch from "./components/Page-Search.vue";
import PageSupport from "./components/Page-Support.vue";
import CompResource from "./components/Comp-Resource.vue";
import ResourceWrap from "./components/Comp-ResourceWrap.vue";
import ResourceEdit from "./components/Comp-ResourceEdit.vue";
import ResourceCreate from "./components/Comp-ResourceCreate.vue";

import PageSurvey from "./components/Page-Survey.vue";
import SurveyResults from "./components/SurveyResults.vue";
import PageLogin from "./components/Page-Login.vue";
import PageBlog from "./components/Page-Blog.vue";
import PageProfile from "./components/Page-Profile.vue";
//import VueCookies from "vue-cookies";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "Home", component: PageHome },
    { path: "/about", name: "About", component: PageAbout },
    { path: "/contribute/:id?", 
      name: "Contribute", 
      component: Contribute,
      props: true},
    { path: "/search", name: "Search", component: PageSearch },
    { path: "/support", name: "Support", component: PageSupport },
    {
      path: "/resource/:id",
      name: "Resource",
      component: ResourceWrap,
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
      component: PageSurvey,
      props: true,
    },
    {
      path: "/survey-result/:id",
      name: "SurveyResults",
      component: SurveyResults,
      props: true,
    },
    //{ path: "/login", name: "Login", component: Login },
    { path: "/blog", name: "Blog", component: PageBlog },
    { path: "/login", name: "Login", component: PageLogin },
    { path: "/profile", name: "Profile", component: PageProfile },
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
app.config.globalProperties.$apiBase = "https://www.dmtc-devel.org"; // use of this is depricated in favor of the provide/inject model supported by the App.vue component. This enables the use of injected variables in setup components, a feature not supported for variables defined with app.config.globalProperties. 
//app.config.globalProperties.$loginStatus = {}; // login status
//app.config.globalProperties.$loginUser = ""; // logged in user

