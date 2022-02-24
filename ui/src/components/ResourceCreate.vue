<template>
  <div>
    <h1>Create a new learning resource</h1>
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
    
    <div 
      v-if="groups.includes('admin') || 
      groups.includes('editor') || 
      groups.includes('reviewer') || 
      groups.includes('submitter')">
      <p>Advanced submission form</p>
      <div class="card card-container">
        <Form @submit="handleSubmission">
          <div v-for="value in this.flatMetadata" :key="value.keyName" class="card card-container">
            <MetaElement 
              :element="value" 
            />
          </div>
        </Form>
      </div>
    </div>
    
    <div v-else-if="groups.includes('lauth')">Basic submission form</div>
    
    <div v-else>Your assigned group is not authorized to submit new learning resources.</div>
    <!--<div v-for="item in this.metadata" :key="item.name">
      <p>{{ item["label"] }}</p>
    </div>-->
  </div>
</template>

<script>
import { Form } from "vee-validate";
//import * as yup from "yup";
import { mapGetters } from "vuex";
import MetaElement from "./metaElement.vue";

export default {
  name: "ResourceCreate",
  components: { 
    MetaElement ,
    Form,
  },

  data() {
    //const schema = yup.object().shape({
    //  title: yup.string().required("Title is required!"),
    //  url: yup.string().required("Resource URL is required!"),
    //});
    return {
      isLoaded: false,
      fetchBase: "/api/resource/?metadata=true",
      fetchURL: "",
      metadata: {},
      flatMetadata: {},
      keyName: "",
      //schema,
      basicMetadataFields: [
        "general___title",
        "general___url",
        "resource_contact___contact__name",
        "resource_contact___contact__email",
      ],
      baseMetadataForRendering: [],
      advancedMetadataFields: [
        "general___title",
        "general___abstract_data",
        "general___url",
        "resource_contact___contact__name",
        "resource_contact___contact__email",
        "resource_contact___citation",
      ],
      advancedMetadataForRendering: [],
    };
  },

  created() {
    this.fetchTemplate();
  },
  
//  beforeUpdate() {
//    this.$store.dispatch("getGroups").then(() => {
//      console.log("getting the user's groups");
//    });
//  },

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
          this.buildMetadataForRendering();
        })
        .catch(() => {});
    },
    buildMetadataForRendering() {
      // refactor grouped metadata object into flat/combined group-field keys and expanded content
      this.flatMetadata = {};
      for (let group in this.metadata) {
        for (let element in this.metadata[group]['fields']) {
          if ('name' in this.metadata[group]['fields'][element]) {
            this.keyName = this.metadata[group]['name'] + "___" + this.metadata[group]['fields'][element]['name']
          } else if ('facet' in this.metadata[group]['fields'][element]) {
            this.keyName = this.metadata[group]['name'] + "___" + this.metadata[group]['fields'][element]['facet']
          } else {
            this.keyName = this.metadata[group]['name'] + "___undefined"
          }
          this.keyName = this.keyName.replace(".", "__");
          //console.log(this.keyName);
          //console.log(this.metadata[group]['fields'][element])
          this.flatMetadata[this.keyName] = this.metadata[group]['fields'][element];
          this.flatMetadata[this.keyName]['keyName'] = this.keyName;
        }
      }
      console.log(this.flatMetadata);
      
      //this.baseMetadataForRendering = [];
      //this.advancedMetadataForRendering = [];
      //// build base metadata element array
      //for (let element in this.basicMetadataFields) {
      //  console.log(this.advancedMetadataFields[element]);
      //  this.baseMetadataForRendering.push(this.metadata[this.advancedMetadataFields[element]])
      //}
      //for (let element in this.advancedMetadataFields) {
      //  console.log(this.advancedMetadataFields[element]);
      //  this.advancedMetadataForRendering.push(this.metadata[this.advancedMetadataFields[element]])
      //}
      //console.log(this.baseMetadataForRendering);
      //console.log(this.advancedMetadataForRendering)
    },
    handleSubmission() {
      console.log("entering handle submission")
    }
  },
};
</script>

<style scoped></style>
