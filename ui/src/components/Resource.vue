<template>
  <div>
    <div>Resource: {{ this.id }}</div>
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

export default {
  name: "Resource",
  components: { ResultItem },

  props: ["id"],

  data() {
    return {
      //resourceID: "32335b19-8e6f-3772-aacc-1379d70330bb",
      isLoaded: false,
      fetchBase: "https://esip-dev-02.edacnm.org/api/resources/?id=",
      fetchURL: "",
      resources: [],
      nResources: 0,
      initialFull: true,
    };
  },

  created() {
    this.fetchItem(this.id);
  },

  watch: {
    resources: function () {
      this.nResources = this.resources.length;
    },
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
          console.log(this.resources.length);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped></style>
