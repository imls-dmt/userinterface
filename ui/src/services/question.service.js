import http from "../utils/http";

class QuestionService {
  getQuestions() {
    return http.get("/api/questions/").then((response) => response.data);
  }
}

export default new QuestionService();
