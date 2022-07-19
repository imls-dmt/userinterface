import axios from 'axios';

const API_URL = '';

class AuthService {
	login(user) {
		console.log("entering AuthService.login(user)")
		let url = API_URL.concat('/api/login_json');
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
					if (response.data.status == "success") {
						console.log("login did not throw an error, login was succssful")
					} else if (response.data.status == "error") {
						alert("Your login failed. Please try again. Error message: " + response.data.message)
					}	
					//localStorage.setItem('loginResult', JSON.stringify(response.data));
				}
				//console.log(response.data.accessToken);
				return response.data;
			});
	}
	
	logout() {
		console.log("entering AuthService.logout()")
		let url = API_URL.concat('/api/logout');
		axios.get(url)
	}
	
}

export default new AuthService();