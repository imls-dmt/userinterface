<template>
  <div>
    <div v-for="item in items" :key="item.date">
      <h3>{{ item.title }}</h3>
      <SupportContentBlock :block="item"></SupportContentBlock>
    </div>
  </div>
</template>

<script>
import SupportContentBlock from "./Comp-SupportContentBlock.vue";
export default {
  name: "SupportTopic",
  props: {
    topic: String, // either "submissionWorkflow", "publishingWorkflow", "MDnuances", or "tipsandtricks"
  },
  //
  components: { SupportContentBlock },
  //
  data() {
    return {
      items: [],
      md_content: "",
    };
  },
  //
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      console.log("entering getItems");
      this.isLoaded = false;
      console.log(this.$support);
      console.log("retrieving support metadata");
      fetch("/source/support.json", {
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
          this.$support = result;
          console.log(this.$support);
          this.items = result[this.topic];
          this.isLoaded = true;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
h3 {
  margin-top: 3px;
  margin-bottom: 0px;
}

p {
  margin-top: 0px;
}
</style>
