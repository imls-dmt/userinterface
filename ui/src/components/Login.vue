<template>
  <div>
    <h1>Login</h1>
    <!-- <form action="https://esip-dev-02.edacnm.org/login/" method="post"> -->
    <form @submit.prevent="processLogin">
      <table>
        <tr>
          <td><label for="username">Username:</label></td>
          <td>
            <input
              type="text"
              v-model="username"
              name="username"
              id="username"
              placeholder="username"
            />
          </td>
        </tr>
        <tr>
          <td><label for="password">Password:</label></td>
          <td>
            <input
              type="password"
              v-model="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td><input type="submit" name="submit" /></td>
        </tr>
      </table>
    </form>

    <!-- <div>
      Interim login/logout option:<br />
      <a href="https://esip-dev-02.edacnm.org/login/" target="_blank">login</a
      ><br />
      <a href="https://esip-dev-02.edacnm.org/logout/" target="_blank"
        >logout</a
      >
    </div> -->

    <!-- <div>{{ this.$loginStatus }}</div>
    <div>{{ this.$loginUser }}</div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      error: null,
      result: '',
      success: false
    };
  },
  methods: {
    processLogin: async function () {
      console.log("processing login information");
      const post_content = {
        username: this.username,
        password: this.password,
      };
      const headers = {
        'Content-Type': 'application/json',
      }
      const url = "https://esip-dev-02.edacnm.org/login_json";
      this.error = null;
      //console.log("body: ", body);
      axios.post(url, post_content, {
        headers: headers
      })
        .then(response => {
          console.log(JSON.stringify(response.data))
        });
    },
  },
};
</script>

<style scoped></style>
