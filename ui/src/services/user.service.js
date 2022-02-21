import axios from 'axios';
//import authHeader from './auth-header';

const API_URL = 'https://www.dmtc-devel.org';

class UserService {
   getGroups() {
//    let url = API_URL.concat('/api/user/groups');
//    return axios({
//      url: url,
//      method: "GET",
//      withCredentials: true
//      }).then(response => {
//        if (response) {
//          console.log(response)
//          //localStorage.setItem('loginResult', JSON.stringify(response.data));
//        }
//        //console.log(response.data.accessToken);
//        return response;
//        });
       return axios.get(API_URL.concat('/api/user/groups'), { withCredentials: true });
  }
    //return axios.get(API_URL + 'user/groups', { headers: authHeader() });
}

export default new UserService();
