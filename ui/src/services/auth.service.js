import axios from 'axios';

const API_URL = 'https://esip-dev-02.edacnm.org/';

class AuthService {
	login(user) {
		let url = API_URL + 'login_json';
		return axios({
			url: url,
			method: "POST",
			data: {
				username: user.username,
				password: user.password
			}, 
			withCredentials: true
		}).then(response => {
				if (response.data) {
					console.log(response.data)
					//localStorage.setItem('loginResult', JSON.stringify(response.data));
				}
				//console.log(response.data.accessToken);
				return response.data;
			});
	}
}

export default new AuthService();