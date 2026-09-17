<template>
  <div>
   <p>You are a member of the following DMTC groups:</p>
   <ul>
     <li v-for="(group,index) in groups" :key="index">{{ group }} </li>
   </ul>
   
   <div v-for="(item, index) in this.resources" :key="item">
      <ResultItem
        :index="index"
        :item="item"
        :nResources="nResources"
        :initialFull="initialFull"
      />
    </div>
       
   <span v-if="!loggedin"><p><router-link :to="{ name: 'LoginTest' }">Login</router-link> to access resource management workflow capabilities for this resource.</p></span>
    


  </div>
</template>

<script>
import ResultItem from "./Comp-ResultItemEdit.vue";
import { mapGetters } from 'vuex';


export default {
  name: "ResourceEdit",
  components: { ResultItem },

  props: ["id"],

  data() {
    return {
      //resourceID: "32335b19-8e6f-3772-aacc-1379d70330bb",
      isLoaded: false,
      fetchBase: "/api/resources/?id=",
      surveyBase: "/api/surveys/?resourceid=",
      fetchURL: "",
      resources: [],
      nResources: 0,
      initialFull: true,
    };
  },

  created() {
    this.$store.dispatch("getGroups").then(
      () => {
        console.log("getting the user's groups")
      }
    );
    this.fetchItem(this.id);
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
  },
};
</script>

<style scoped></style>
