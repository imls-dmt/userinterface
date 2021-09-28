<template>
  <div>
    <span v-if="!loggedin"><p><router-link :to="{ name: 'LoginTest' }">Login</router-link> to access assessment and workflow capabilities for this resource.</p></span>
    
   <div class="container">
     <p>Available Assessment Surveys: </p>
     <ul v-if="this.surveys.length > 0">
        <li v-for="(survey, index) in this.surveys" :key="index">
            {{ survey.label }} 
            <router-link :to="`/survey/${survey.id}`"><img src="@/assets/Pencil.png" style="width:36px;" /></router-link>
            <router-link :to="`/survey-result/${survey.id}`"><img src="@/assets/Graph.png" style="width:36px;" /></router-link>
        </li>
     </ul>
     <p v-else>No surveys are currently available for this learning resource</p>
   </div>
   
   <div v-for="(item, index) in this.resources" :key="item">
      <ResultItem
        :index="index"
        :item="item"
        :nResources="nResources"
        :initialFull="initialFull"
      />
    </div>
  </div>
</template>

<script>
import ResultItem from "./ResultItem.vue";
import { mapGetters } from 'vuex';


export default {
  name: "Resource",
  components: { ResultItem },

  props: ["id"],

  data() {
    return {
      //resourceID: "32335b19-8e6f-3772-aacc-1379d70330bb",
      isLoaded: false,
      fetchBase: "https://esip-dev-02.edacnm.org/api/resources/?id=",
      surveyBase: "https://esip-dev-02.edacnm.org/api/surveys/?resourceid=",
      fetchURL: "",
      resources: [],
      surveys: [],
      nResources: 0,
      initialFull: true,
    };
  },

  created() {
    this.fetchItem(this.id);
    this.fetchSurveys(this.id);
  },

  watch: {
    resources: function () {
      this.nResources = this.resources.length;
    },
  },
  
  computed: {
    ...mapGetters([
      'loggedin',
      'username',
      'groups'
    ])
    },

  methods: {
    fetchItem(id) {
      console.log("entering fetchItem");
      this.isLoaded = false;
      console.log("Trying to retrieve record ID: ", id);
      this.fetchURL = this.fetchBase.concat(id);
      console.log("Request URL: ", this.fetchURL);
      fetch(this.fetchURL, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error();
          }
        })
        .then((result) => {
          this.resources = result["results"];
          console.log(this.resources);
          console.log(this.resources.length);
        })
        .catch(() => {});
    },
    fetchSurveys(id) {
      console.log("entering fetchSurveys");
      this.isLoaded = false;
      console.log("Trying to retrieve surveys for record ID: ", id);
      this.fetchURL = this.surveyBase.concat(id);
      console.log("Request URL: ", this.fetchURL);
      fetch(this.fetchURL, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
              return response.json();
            } else {
              throw new Error();
            }
          })
          .then((result) => {
            this.surveys = result["surveys"];
            console.log(this.surveys);
            console.log(this.surveys.length);
          })
          .catch(() => {});
    },
  },
};
</script>

<style scoped></style>
