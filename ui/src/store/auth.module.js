import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

//const loginResult = JSON.parse(localStorage.getItem('loginResult'));
//const initialState = loginResult.status == "success"
//	? { status: { loggedIn: true } }
//	: { status: { loggedIn: false } };

const initialState = {
	working: false,
	user: {
		loggedIn: false,
		username: "",
	},
	groups: [],	
}

export const auth = {
	namespaced: true,
	state: initialState,
	getters: {
		fullState: state => state,
		user: state => state.user,
		loggein: state => state.user.loggedIn,
		username: state => state.user.username,
		groups: state => state.groups,
		working: state => state.working,
	},
	actions: {
		login({ commit }, user) {
			commit('setWorking', true);
			return AuthService.login(user).then(
				result => {
					if (result.status == "success") {
						commit('loginSuccess');
						commit('setUsername', user.username);
						commit('setWorking', false);
						return Promise.resolve(user);
					} else {
						commit('loginFailure');
						commit('setWorking', false);
						return Promise.resolve(user);
					}
				},
				error => {
					commit('loginFailure');
					commit('setWorking', false);
					return Promise.reject(error);
				}
			);
		},
		logout({ commit }) {
			console.log("entering auth.module.js logout action")
			commit('setWorking', true);
			AuthService.logout();
			commit('logout');
			commit('setWorking', false);
		},
		getGroups({ commit }) {
			commit('setWorking', true);
			return UserService.getGroups().then(
				result => {
					console.log(result);
					commit('setGroups', result);
					commit('setWorking', false);
				}
			)
		}
	},
	mutations: {
		loginSuccess(state) {
			state.user.loggedIn = true;
			console.log(state);
		},
		loginFailure(state) {
			state.user.loggedIn = false;
			state.user.username = null;
			console.log(state)
		},
		logout(state) {
			state.user.loggedIn = false;
			state.user.username = null;
			console.log(state)
		},
		setUsername(state, username) {
			state.user.username = username;
			console.log(state)
		},
		setGroups (state, groups) {
			state.groups = groups;
			console.log(state)
		},
		setWorking (state, workingState) {
			state.working = workingState;
			console.log(state)
		}
	}
};
