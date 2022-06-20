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
    create: false,
    update: false,
    del: false,
    publish: false,
  },
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
      console.log(state);
    },
    setUsername(state, username) {
      state.user.username = username;
      console.log(state);
    },
    setGroups(state, groups) {
      state.groups = groups.data.groups;
      if (state.groups.includes("admin")) {
        state.auth.create = true;
        state.auth.update = true;
        state.auth.del = true;
        state.auth.publish = true;
      } else if (state.groups.includes("editor")) {
        state.auth.create = true;
        state.auth.update = true;
        state.auth.del = false;
        state.auth.publish = true;
      } else if (state.groups.includes("reviewer")) {
        state.auth.create = true;
        state.auth.update = true;
        state.auth.del = false;
        state.auth.publish = false;
      } else if (state.groups.includes("submitter")) {
        state.auth.create = true;
        state.auth.update = false;
        state.auth.del = false;
        state.auth.publish = false;
      } else {
        state.auth.create = false;
        state.auth.update = false;
        state.auth.del = false;
        state.auth.publish = false;
      }
      console.log(state);
    },
    setWorking(state, workingState) {
      state.working = workingState;
      console.log(state);
    },
  },
});
