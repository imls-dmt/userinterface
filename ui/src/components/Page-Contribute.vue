<template>
  <div>
    <div v-if="!loggedin">
      <p>
        If you are
        <router-link :to="{ name: 'Login' }">logged into</router-link> the
        Clearinghouse you may submit new learning resources and edit existing ones if you have sufficient permissions.
      </p>
    </div>
    <div v-else>
      <!-- <p>You are logged in as <b>{{ username }}</b>, and your assigned groups are
              <span v-for="(group, index) in groups" :key="index">
                <span v-if="index > 0">, </span>
                <b>{{ group }}</b></span>. You can create and submit new learning resources for review and publication. 
            </p> -->
      <div v-if="id">You are editing learning resource: {{ id }}</div>
      <div v-else>You are creating a new resource.</div>
      <suspense>
        <template #default>
          <ResourceCreate :resourceID="id"/>
        </template>
        <template #fallback>
          <p>Loading metadata template ...</p>
        </template>
      </suspense>

      <!--
            <hr/>
            <h1>Assessment</h1>
            <p>Clearinghouse assessment capabilities are built up from <span class="emph">individual questions</span> which are then combined into <span class="emph">question groups</span> that are then used to build <span class="emph">surveys</span> that are linked to specific learning resources. In support of maximum reusability of the assessment tools in the Clearinghouse all questions and question groups are publicly shared and reusable in multiple surveys. Individual surveys are linked to user accounts so that their results may be linked to specific learning events and activities managed by individual Clearinghouse users. </p>
            
            <p>Publicly accessible questions and question groups may be contributed through the tools below. Surveys for specific learning resources based on available question groups may be created through the summary page for each learning resource.</p>  
            
            <h2>Add/manage Assessment Questions</h2>
            
            <p>Here is a list of current questions available through the Clearinghouse. All registered Clearinghouse members may submit new questions for integration into the Clearinghouse. If you have sufficient permissions, you may also edit or delete existing questions <span class="emph"> that are not currently a part of a question group that is a component in a survey</span>.</p>
            
            <div>
                <button class="btn btn-primary btn-block" @click="getQuestions" :disabled="loading">
                    <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                    ></span>
                    <span>Re/Load Questions</span>
                </button>
            </div>
            
            <table>
                <th>
                    <td>Name</td>
                    <td>Label</td>
                    <td>Question</td>
                    <td>Options</td>
                    <td>Available Actions</td>
                </th>
                <tr v-for="question in questions" :key="question.id">
                    <td>{{ question.name }}</td>
                    <td>{{ question.label }}</td>
                    <td>{{ question.element }}</td>
                    <td>{{ question.options }}</td>
                    <td>Actions ...</td>
                </tr>
            </table>
            
            <h2>Add/manage Assessment Question Groups</h2>
        -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuestionService from "../services/question.service";
import ResourceCreate from "./Comp-ResourceCreate.vue";

export default {
  name: "PageContribute",
  components: { ResourceCreate },
  data() {
    return {
      loading: false,
      qMode: "initial",
      displayQuestions: false,
      qID: null,
      newResource: {
        title: "",
        url: "",
        access_cost: "",
        submitter_name: "",
        submitter_email: "",
        authors: [
          {
            givenName: "",
            familyName: "",
            name_identifier: "",
            name_identifier_type: "",
          },
        ],
        author_names: [],
        author_org: [
          {
            name: "",
            name_identifier: "",
            name_identifier_type: "",
          },
        ],
        contact: {
          name: "",
          org: "",
          email: "",
        },
      },
      newQuestion: {
        label: "",
        name: "",
        input_type: "",
        element: "",
        options: "",
      },
      currentQuestion: {},
      questions: [],
    };
  },
  props: ["id"],
  computed: {
    ...mapGetters(["loggedin", "username", "groups"]),
    qPriv() {
      return (
        this.$store.getters.groups.indexOf("editor") > 0 ||
        this.$store.getters.groups.indexOf("admin") > 0
      );
    },
    gPriv() {
      return (
        this.$store.getters.groups.indexOf("editor") > 0 ||
        this.$store.getters.groups.indexOf("admin") > 0
      );
    },
    noQuestions() {
      return this.questions.length;
    },
  },
  methods: {
    qModeCreate() {
      console.log("qModeCreate");
      this.qMode = "create";
    },
    qModeDisplay() {
      console.log("qModeDisplay");
      this.qMode = "display";
    },
    qModeUpdate(id) {
      console.log("qModeUpdate" + id);
      this.qMode = "update";
    },
    qModeDelete(id) {
      console.log("qModeDelete" + id);
      this.qMode = "delete";
    },
    getQuestions() {
      this.loading = true;
      this.questions = QuestionService.getQuestions();
      console.log(this.questions);
      if (this.noQuestions > 0) {
        this.displayQuestions = true;
      }
      console.log(this.noQuestions);
      this.loading = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
