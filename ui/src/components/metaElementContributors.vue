<template>
  <div>
    <button type="button" class="flexiButton">Combine entries and add them to the contributors list</button>
    <div v-for="field in contributorFields" :key="field">
      <MetaElement 
        :element='template[field]'
        :fieldName='field' />
    </div>
    <div id="contributor-list" class="flexiList">Added contributors will be displayed here</div>
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
import MetaElement from "./metaElement.vue";
export default {
  props: ["template", "contributorFields"],
  
  name: "MetaElementContributors",
  components: {
    MetaElement
  //		Field,
  //		ErrorMessage,
  },
  data() {
    return {
      values: [],
    };
  },
};
</script>

<style scoped>
</style>
