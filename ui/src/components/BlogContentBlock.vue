<template>
  <div v-if="isLoaded" class="blog-content">
    <VueMarkdownIt :source="content" />
  </div>
  <div v-else>{{ block.title }} (loading content...)</div>
</template>

<script>
// Markedown component from https://vuejsexamples.com/a-vue-3-markdown-it-wrapper-plugin/
import VueMarkdownIt from "vue3-markdown-it";

// const url_root = "http://static.dmtc-devel.org/";

export default {
  name: "BlogContentBlock",
  props: {
    block: {},
  },

  components: { VueMarkdownIt },

  data() {
    return {
      content: "",
      isLoaded: false,
    };
  },

  mounted() {
    this.getMDContent();
  },

  methods: {
    getMDContent() {
      this.isLoaded = false;
      // console.log("block : ", this.block);
      console.log(this.block.content);
      if (this.block.content.startsWith("http")) {
        // console.log("if...");
        // fetch(url_root + this.block.content, {
        fetch(this.block.content, {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(body),
        })
          .then((response) => {
            if (response.ok) {
              // DO NOT do anything to the response, including console.log
              // or else it will cause an error that response is "disturbed"
              return response.text();
            } else {
              throw new Error();
            }
          })
          .then((result) => {
            this.content = result;
            this.isLoaded = true;
          })
          .catch(() => {
            //this.error = true;
          });
      } else {
        this.content = this.block.content;
        this.isLoaded = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
