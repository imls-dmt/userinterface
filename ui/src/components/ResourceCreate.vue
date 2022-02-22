<template>
  <div>
    <span v-if="!loggedin"
      ><p>
        <router-link :to="{ name: 'Login' }">Login</router-link> to create and
        submit a new learning resource.
      </p></span
    >
    <span v-else>
      You are logged in as <b>{{ username }}</b
      >, and your assigned groups are
      <span v-for="(group, index) in groups" :key="index">
        <span v-if="index > 0">, </span>
        <b>{{ group }}</b>
      </span>
    </span>

    <!--
    <div v-for="(item, index) in this.resources" :key="item">
      <ResultItem
        :index="index"
        :item="item"
        :nResources="nResources"
        :initialFull="initialFull"
      />
    </div>
    -->
  </div>
</template>

<script>
//import ResultItem from "./ResultItemEdit.vue";
import { mapGetters } from "vuex";

export default {
  name: "Resource",
  //components: { ResultItem },

  data() {
    return {
      isLoaded: false,
      fetchBase: "/api/resource/?metadata=true",
      fetchURL: "",
      metadata: {},
      basicMetadataFields: [
        "title",
        "abstract_data",
        "url",
        "contact.name",
        "contact.email",
      ],
      advancedMetadataFields: [
        "title",
        "abstract_data",
        "url",
        "contact.name",
        "contact.email",
      ],
    };
  },

  created() {
    this.$store.dispatch("getGroups").then(() => {
      console.log("getting the user's groups");
    });
    this.fetchTemplate();
  },

  computed: {
    ...mapGetters(["loggedin", "username", "groups"]),
  },

  methods: {
    fetchTemplate() {
      console.log("entering fetchTemplate");
      this.isLoaded = false;
      this.fetchURL = this.$apiBase.concat(this.fetchBase);
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
          this.metadata = result;
          console.log(this.metadata);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped></style>
