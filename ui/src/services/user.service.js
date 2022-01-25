import axios from 'axios';
//import authHeader from './auth-header';

const API_URL = '/';

class UserService {
   getGroups() {
    //return axios.get(API_URL + 'user/groups', { headers: authHeader() });
    return axios.get(API_URL + 'api/user/groups', { withCredentials: true });
  }
}

export default new UserService();
