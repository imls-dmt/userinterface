<template>
  <div>
    <button type="button" class="flexiButton">Combine entries and add them to the contributor orgs list</button>
    <div v-for="field in contributorOrgFields" :key="field">
      <MetaElement 
        :element='template[field]'
        :fieldName='field' />
    </div>
    <div id="contributor-org-list" class="flexiList">Added contributor organizations will be displayed here</div>
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
import MetaElement from "./metaElement.vue";
export default {
  props: ["template", "contributorOrgFields"],
  
  name: "MetaElementContributorOrgs",
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
  methods: {
    
  }
};
</script>

<style scoped>
</style>
