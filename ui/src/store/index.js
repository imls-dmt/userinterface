// import { createStore } from "vuex";
// import { auth } from "./auth.module";
//
// const store = createStore({
// 	modules: {
// 		auth,
// 	},
// });
//
// export default store;

import Vuex from "vuex";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const initialState = {
  working: false,
  user: {
    loggedIn: false,
    username: "",
  },
  groups: [],
  auth: {
    create_short: false,
    create: false,
    update: false,
    submit_publish: false,
    publish: false,
    submit_delete: false, 
    del: false,
  },
  results: [],
};

export default new Vuex.Store({
  namespaced: true,
  state: initialState,
  getters: {
    fullState: (state) => state,
    user: (state) => state.user,
    loggedin: (state) => state.user.loggedIn,
    username: (state) => state.user.username,
    groups: (state) => state.groups,
    working: (state) => state.working,
    auth: (state) => state.auth,
    authCreate: (state) => state.auth.create,
    authUpdate: (state) => state.auth.update,
    authDelete: (state) => state.auth.del,
    authPublish: (state) => state.auth.publish,
    results: (state) => state.results,
  },
  actions: {
    login({ commit }, user) {
      commit("setWorking", true);
      return AuthService.login(user).then(
        (result) => {
          if (result.status == "success") {
            commit("loginSuccess");
            commit("setUsername", user.username);
            commit("setWorking", false);
            return Promise.resolve(user);
          } else {
            commit("loginFailure");
            commit("setWorking", false);
            return Promise.resolve(user);
          }
        },
        (error) => {
          commit("loginFailure");
          commit("setWorking", false);
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      commit("setWorking", true);
      commit("logout");
      commit("setWorking", false);
    },
    getGroups({ commit }) {
      commit("setWorking", true);
      return UserService.getGroups().then((result) => {
        console.log(result);
        commit("setGroups", result);
        commit("setWorking", false);
      });
    },
  },
  mutations: {
    loginSuccess(state) {
      state.user.loggedIn = true;
      console.log(state);
    },
    loginFailure(state) {
      state.user.loggedIn = false;
      state.user.username = null;
      state.user.groups = [];
      console.log(state);
    },
    logout(state) {
      state.user.loggedIn = false;
      state.user.username = null;
      state.groups = [];
      state.auth.create_short = false;
      state.auth.create = false;
      state.auth.update = false;
      state.auth.submit_publish = false;
      state.auth.publish = false;
      state.auth.submit_delete = false;
      state.auth.del = false;
      console.log(state);
    },
    setUsername(state, username) {
      state.user.username = username;
      console.log(state);
    },
    setGroups(state, groups) {
      state.groups = groups.data.groups;
      state.user.username = groups.data.name;
      if (state.groups.length == 0) {state.user.loggedIn = false} else {state.user.loggedIn = true}
      if (state.groups.includes("admin")) {
        state.auth.create_short = true;
        state.auth.create = true;
        state.auth.update = true;
        state.auth.submit_publish = true;
        state.auth.publish = true;
        state.auth.submit_delete = true;
        state.auth.del = true;
      } else if (state.groups.includes("editor")) {
        state.auth.create_short = true;
        state.auth.create = true;
        state.auth.update = true;
        state.auth.submit_publish = true;
        state.auth.publish = true;
        state.auth.submit_delete = true;
        state.auth.del = true;
      } else if (state.groups.includes("reviewer")) {
        state.auth.create_short = true;
        state.auth.create = true;
        state.auth.update = true;
        state.auth.submit_publish = true;
        state.auth.publish = false;
        state.auth.submit_delete = true;
        state.auth.del = false;
      } else if (state.groups.includes("submitter")) {
        state.auth.create_short = true;
        state.auth.create = true;
        state.auth.update = true;
        state.auth.submit_publish = false;
        state.auth.publish = false;
        state.auth.submit_delete = true;
        state.auth.del = false;
      } else if ( state.groups.includes("lauth") || state.groups.includes("oauth")) {
        state.auth.create_short = true;
        state.auth.create = false;
        state.auth.update = false;
        state.auth.submit_publish = false;
        state.auth.publish = false;
        state.auth.submit_delete = false;
        state.auth.del = false;
      } else {
        state.auth.create_short = false;
        state.auth.create = false;
        state.auth.update = false;
        state.auth.submit_publish = false;
        state.auth.publish = false;
        state.auth.submit_delete = false;
        state.auth.del = false;
      }
      console.log(state);
    },
    setWorking(state, workingState) {
      state.working = workingState;
      console.log(state);
    },
    setResults(state, results) {
      state.results = results;
      console.log(state);
    },

  },
});
