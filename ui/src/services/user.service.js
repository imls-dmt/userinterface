import http from "../utils/http";

class UserService {
  getGroups() {
    return http.get("/api/user/groups");
  }
}

export default new UserService();
