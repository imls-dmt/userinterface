import axios from 'axios';
//import authHeader from './auth-header';

const API_URL = 'https://esip-dev-02.edacnm.org/';

class UserService {
   getGroups() {
    //return axios.get(API_URL + 'user/groups', { headers: authHeader() });
    return axios.get(API_URL + 'user/groups', { withCredentials: true });
  }
}

export default new UserService();
