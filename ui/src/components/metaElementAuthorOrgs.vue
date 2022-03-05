<template>
  <div>
    <div>
      <div id="author-orgs-list" class="flexiList">Added authoring organizations will be displayed here</div>
      <button type="button" class="flexiButton">Combine entries and add them to the authoring organization list</button>
      <div v-for="field in authorOrgFields" :key="field">
        <MetaElement 
          :element='template[field]'
          :fieldName='field' />
      </div>
    </div>
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
import MetaElement from "./metaElement.vue";
export default {
  props: ["template", "authorOrgFields"],
  name: "MetaElementAuthorOrgs",
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
