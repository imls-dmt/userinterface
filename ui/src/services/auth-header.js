export default function authHeader() {
  //let user = JSON.parse(localStorage.getItem('loginResult'));
  //if (user && user.accessToken) {
  if (this.$store.state.user.loggedIn) {
    //return { Authorization: 'Bearer ' + user.accessToken };
    return { withCredentials: true };
  } else {
    return {};
  }
}
