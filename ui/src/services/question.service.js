import axios from 'axios';

const API_URL = 'https://esip-dev-02.edacnm.org/';

class QuestionService {
	getQuestions() {
		let url = API_URL + 'api/questions/';
		return axios({
			url: url,
			method: "get",
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
	
	createQuestion(questionJSON) {
		console.log("creating a question");
		console.log(questionJSON);	
	}

	upateQuestion(questionID) {
		console.log("update question: " + questionID);
	}
	
	deleteQuestion(questionID) {
		console.log("delete question: " + questionID);
	}
}

export default new QuestionService();