<template>
  <div>
    <div>
      <div>
        <h1>Submission Workflow</h1>
        <SupportTopic topic="submissionWorkflow"></SupportTopic>
      </div>
      <!--
      <div>
        <h1>Publishing Workflow</h1>
        <SupportTopic topic="publishingWorkflow"></SupportTopic>
      </div>
      
      <div>
        <h1>Process Nuances</h1>
        <SupportTopic topic="MDnuances"></SupportTopic>
      </div>
      
      <div>
        <h1>Tips and Tricks</h1>
        <SupportTopic topic="tipsandtricks"></SupportTopic>
      </div>
    --></div>
  </div>
</template>

<script>
import SupportTopic from "./Comp-SupportTopic.vue";
export default {
  name: "PageSupport",
  components: { SupportTopic },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
