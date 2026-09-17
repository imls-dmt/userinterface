<template>
  <div>
    <div v-for="(item, index) in resources" :key="item">
      <ResultItem
        :index="index"
        :item="item"
        :nResources="nResources"
        :initialFull="initialFull"
        :id="id"
      />
    </div>

    <div class="container">
      <p>Resource Feedback:</p>
      <ul v-if="surveys.length > 0">
        <li v-for="(survey, index) in surveys" :key="index">
          {{ survey.label }} survey<br />
          <router-link :to="`/survey-result/${survey.id}`"
            ><img src="@/assets/Graph.png" style="width: 36px" />View feedback
            provided for this learning resource.</router-link
          >
          <br />
          <span v-if="loggedin">
            <router-link :to="`/survey/${survey.id}`"
              ><img src="@/assets/Pencil.png" style="width: 36px" />Provide
              feedback on this learning resource.</router-link
            >
          </span>
        </li>
      </ul>
      <p v-else>
        No surveys are currently available for this learning resource
      </p>
    </div>

    <span v-if="!loggedin">
      <p>
        <router-link :to="{ name: 'Login' }">Login</router-link> to access
        assessment and workflow capabilities for this resource.
      </p>
    </span>
  </div>
</template>

<script>
import ResultItem from "./Comp-ResultItem.vue";
import { mapGetters } from "vuex";
import { inject } from "vue";
import { ref } from "vue";

export default {
  name: "CompResource",
  components: { ResultItem },

  props: ["id"],

  async setup(props) {
    console.log("Setup - starting for resource ID: ", props.id);
    let apiBase = inject("$appApiBase");
    let fetchBase = "/api/resources/?id=";
    let surveyBase = "/api/surveys/?resourceid=";
    let isLoaded = false;
    let resources = {};
    let surveys = {};
    async function fetchItem(id) {
      console.log("entering fetchItem");
      console.log("Trying to retrieve record ID: ", id);
      let fetchURL = apiBase.concat(fetchBase, id);
      console.log("Request URL: ", fetchURL);
      await fetch(fetchURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then((result) => {
          console.log("result in fetch: ", result);
          resources = result["results"];
        });
      //await fetch(fetchURL, {
      //  method: "GET",
      //})
      //  .then((response) => {
      //    if (response.ok) {
      //      return response.json();
      //    } else {
      //      throw new Error();
      //    }
      //  })
      //  .then((result) => {
      //    isLoaded = true
      //    //console.log(result["results"]);
      //    //console.log(result["results"].length);
      //    return(result["results"]);
      //  })
      //  .catch(() => {});
    }
    async function fetchSurveys(id) {
      console.log("entering fetchSurveys");
      isLoaded = false;
      console.log("Trying to retrieve surveys for record ID: ", id);
      let fetchURL = apiBase.concat(surveyBase, id);
      console.log("Request URL: ", fetchURL);
      await fetch(fetchURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then((result) => {
          console.log("result in fetch: ", result);
          surveys = result["surveys"];
        });

      //await fetch(fetchURL, {
      //  method: "GET",
      //})
      //  .then((response) => {
      //    if (response.ok) {
      //      return response.json();
      //    } else {
      //      throw new Error();
      //    }
      //  })
      //  .then((result) => {
      //    isLoaded = true
      //    //console.log(result["surveys"]);
      //    //console.log(result["surveys"].length);
      //    return(result["surveys"]);
      //  })
      //  .catch(() => {});
      //
    }
    const resourcesOutcome = await fetchItem(props.id);
    const surveysOutcome = await fetchSurveys(props.id);
    console.log("resources: ", resources);
    console.log("surveys: ", surveys);
    return {
      resources,
      surveys,
    };
  },

  data() {
    return {
      //resourceID: "32335b19-8e6f-3772-aacc-1379d70330bb",
      isLoaded: false,
      //fetchBase: "/api/resources/?id=",
      //surveyBase: "/api/surveys/?resourceid=",
      fetchURL: "",
      //resources: [],
      //surveys: [],
      nResources: 0,
      initialFull: true,
    };
  },

  beforeCreate() {
    console.log("resources: ", this.resources);
    console.log("surveys: ", this.surveys);
  },

  created() {
    //this.$store.dispatch("getGroups").then(() => {
    //  console.log("getting the user's groups");
    //});
    //this.fetchSurveys(this.id);
  },

  watch: {
    resources: function () {
      this.nResources = this.resources.length;
    },
  },

  computed: {
    ...mapGetters(["loggedin", "username", "groups", "auth"]),
  },

  methods: {
    fetchItem(id) {
      console.log("entering fetchItem");
      this.isLoaded = false;
      console.log("Trying to retrieve record ID: ", id);
      this.fetchURL = this.$apiBase.concat(this.fetchBase, id);
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
      this.fetchURL = this.$apiBase.concat(this.surveyBase, id);
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

<style scoped>
h2 {
  background-color: bisque;
}
</style>
