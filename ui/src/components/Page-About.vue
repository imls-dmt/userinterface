<template>
  <div v-if="isLoaded">
    <div class="flex-container">
        <div class="block_01">
            <AboutContentBlock :block="about_content['block_01']">
            </AboutContentBlock>
        </div>
        <div class="block_02">
            <AboutContentBlock :block="about_content['block_02']">
            </AboutContentBlock>
        </div>
        <!-- 
<div class="block_03">
            <AboutContentBlock :block="about_content['block_03']">
            </AboutContentBlock>
        </div>
 -->
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import AboutContentBlock from "./AboutContentBlock.vue"
export default {
  name: 'PageAbout',
  components: { AboutContentBlock },
  
  data() {
    return {
      about_content: {},
      index: 0,
      isLoaded: false,
      nothing: "",
    };
  },

  mounted() {
    //console.log("entered about.mounted()");
    this.getAboutContent();
  },

  methods: {
    getAboutContent() {
      // console.log("entered getAbouteContent()");
      this.isLoaded = false;
      fetch("/source/AboutPage.json", {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            // DO NOT do anything to the response, including console.log
            // or else it will cause an error that response is "disturbed"
            return response.json();
          } else {
            throw new Error();
          }
        })
        .then((result) => {
          //console.log("About result = ", result);
          this.about_content = result;
          // console.log("about_content = ", this.about_content);
          this.isLoaded = true;
        })
        .catch(() => {
          //this.error = true;
        });
    },
  }, 
}
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
