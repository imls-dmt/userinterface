import http from "../utils/http";

class AuthService {
  login(user) {
    return http
      .post("/api/login_json", { username: user.username, password: user.password })
      .then((response) => {
        const data = response.data || {};
        if (data.status === "error") {
          alert("Your login failed. Please try again. Error message: " + data.message);
        }
        return data;
      });
  }

  logout() {
    return http.get("/api/logout");
  }
}

export default new AuthService();
