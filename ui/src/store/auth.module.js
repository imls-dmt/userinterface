import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

//const loginResult = JSON.parse(localStorage.getItem('loginResult'));
//const initialState = loginResult.status == "success"
//	? { status: { loggedIn: true } }
//	: { status: { loggedIn: false } };

const initialState = {
	user: {
		loggedIn: false,
		username: "",
	},
	groups: [],	
}

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return AuthService.login(user).then(
				result => {
					if (result.status == "success") {
						commit('loginSuccess');
						commit('setUsername', user.username);
						return Promise.resolve(user);
					} else {
						commit('loginFailure');
						return Promise.resolve(user);
					}
				},
				error => {
					commit('loginFailure');
					return Promise.reject(error);
				}
			);
		},
		logout({ commit }) {
			AuthService.logout();
			commit('logout');
		},
		getGroups({ commit }) {
			return UserService.getGroups().then(
				result => {
					console.log(result);
					commit('setGroups', result);
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
		}
	}
};
