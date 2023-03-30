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
      <p>
        The Data Management Training Clearinghouse has two methods for
        authenticating as a user who can submit new resources and comment on
        existing resources. If additional roles, such as reviewer, editor, or
        admin have been assigned to your user these are also accessed through
        your login. While a DMTC-specific login can be requested, we strongly
        recommend using the ORCID login process as it can be immediately
        provisioned and used. You can request a DMTC-specific login or
        additional roles for your login by contacting
        <a href="mailto:clearinghouseEd@esipfed.org"
          >clearinghouseEd@esipfed.org.</a
        >
      </p>
      <div class="row">
        <div class="column">
          <h2>ORCID Login</h2>
          <div>
            <a
              href="https://www.dmtc-devel.org/api/orcid_sign_in"
              rel="noreferrer"
            >
              <button>
                <img
                  alt="ORCID logo"
                  src="@/assets/72px-ORCID_iD.png"
                  class="login"
                />ORCID Login
              </button>
            </a>
          </div>
        </div>

        <div class="column">
          <h2>DMTC-specific login</h2>
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
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
//import { required } from 'vee-validate/dist/rules'
import * as yup from "yup";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "PageLogin",

  components: {
    // eslint-disable-next-line
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
      reloads: 0,
      local_groups: [],
      local_auths: [],
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
          //this.$router.push("/profile");
          this.$store.dispatch("getGroups").then(() => {
            console.log("getting the user's groups");
            console.log(this.$store.state.groups);
            this.local_groups = this.$store.getters.groups;
            this.local_auths = this.$store.getters.auth;
          });
          this.reloads++;
          this.loading = false;
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
      console.log("entering handleLogout");
      this.loading = true;
      let url = "/api/logout";
      axios.get(url);
      this.$store.commit("logout");
      //this.$store.dispatch("logout");
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
}

.column {
  flex: 50%;
}

.mid-mid {
  vertical-align: middle;
  margin: auto;
}
</style>
