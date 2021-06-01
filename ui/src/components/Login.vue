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

    <div>{{ result }}</div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: false,
      result: "",
    };
  },
  methods: {
    processLogin: function () {
      console.log("processing login information");
      let post_content = {};
      post_content.username = this.username;
      post_content.password = this.password;
      this.error = false;
      let body = post_content;
      //console.log("body: ", body);

      fetch("https://esip-dev-02.edacnm.org/login_json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            // DO NOT do anything to the response, including console.log
            // or else it will cause an error that response is "disturbed"
            return response.json();
          } else {
            throw new Error();
          }
        })
        .then((result) => {
          console.log(result);
          this.result = result;
        })
        .catch((err) => {
          console.log("error generated");
          console.log(err);
          this.error = true;
        });
    },
  },
};
</script>

<style scoped></style>
