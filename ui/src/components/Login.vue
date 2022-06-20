<template>
  <div class="col-md-12">
    <span v-if="loggedin">
      <p>You are logged in as: {{ username }}</p>
      <p>You are a member of the following DMTC groups:</p>
      <ul>
        <span v-for="(group, index) in groups" :key="index">
          <li v-if="group == 'admin'">Administrator</li>
          <li v-if="group == 'editor'">Editor</li>
          <li v-if="group == 'reviewer'">Reviewer</li>
          <li v-if="group == 'submitter'">Submitter</li>
        </span>
      </ul>
      <p>
        Your groups authorize you to perform the following actions in the
        Clearinghouse:<br />
        <img
          v-if="auth.create"
          src="@/assets/noun-create-document-1868022.png"
          alt="Create new resource"
          title="Create new resource"
          class="icon"
        />
        <img
          v-if="auth.update"
          src="@/assets/noun-check-mark-1867972.png"
          alt="Review/update resource"
          title="Review/update resource"
          class="icon"
        />
        <img
          v-if="auth.publish"
          src="@/assets/noun-share-symbol-1868078.png"
          alt="Publish/unpublish a resource"
          title="Publish/unpublish a resource"
          class="icon"
        />
        <img
          v-if="auth.del"
          src="@/assets/noun-dustbin-1868018.png"
          alt="Delete a resource"
          title="Delete a resource"
          class="icon"
        />
      </p>
      <p>
        To request that you be added to additional DMTC groups please
        <a
          href="mailto:clearinghouseEd@esipfed.org?subject=Request for DMTC group change"
          >email us</a
        >.
      </p>
      <Form @submit="handleLogout">
        <div class="form-group">
          <button class="btn btn-primary btn-block">
            <span>Logout</span>
          </button>
        </div>
      </Form>
    </span>
    <span v-else>
      <div class="card card-container">
        <Form @submit="handleLogin" :validation-schema="schema">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Login</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </span>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapGetters } from "vuex";

export default {
  name: "Login",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },

  computed: {
    ...mapGetters(["loggedin", "username", "groups", "auth"]),
  },

  methods: {
    handleLogin(user) {
      this.loading = true;
      //console.log("username: " + user.username)
      //console.log(user);
      this.$store.dispatch("login", user).then(
        () => {
          //console.log(response)
          this.loading = false;
          //this.$router.push("/profile");
          this.$store.dispatch("getGroups").then(() => {
            console.log("getting the user's groups");
            console.log(this.$store.state.groups);
          });
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    handleLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped></style>
