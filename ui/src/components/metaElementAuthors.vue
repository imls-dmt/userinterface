<template>
  <div>
    <div id="authors-list" class="flexiList">Added authors will be displayed here</div>
    <button type="button" class="flexiButton">Combine entries and add them to the authors list</button>
    <div v-for="field in authorFields" :key="field">
      <MetaElement 
        :element='template[field]'
        :fieldName='field' />
    </div>
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
import MetaElement from "./metaElement.vue";
export default {
  props: ["template", "authorFields"],
  
  name: "MetaElementAuthors",
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
