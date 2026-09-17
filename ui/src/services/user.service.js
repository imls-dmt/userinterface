import axios from 'axios';
//import authHeader from './auth-header';

// original value
const API_URL = '';

class UserService {
   getGroups() {
       return axios.get(API_URL.concat('/api/user/groups'), { withCredentials: true });
  }
}

export default new UserService();
