<template>
  <!-- https://www.w3docs.com/snippets/css/how-to-align-divs-side-by-side.html -->
  <div v-if="isLoaded">
    <div class="flex-container">
      <div class="top-container">
        <HomeContentBlock :block="home_content['block_01']"></HomeContentBlock>
        <HeroImages :data="home_content['hero_images']"></HeroImages>
      </div>
      <!-- <SearchBar :value_in="nothing"></SearchBar> -->
      <div class="bottom-container">
        <div class="bottom-blocks">
          <h2 class="bottom">Featured Resources</h2>
          <BlogTopic topic="features"></BlogTopic>
        </div>
        <div class="bottom-blocks">
          <h2 class="bottom">Recent News Items</h2>
          <BlogTopic topic="news"></BlogTopic>
        </div>
        <div class="bottom-blocks">
          <h2 class="bottom">Announcements</h2>
          <BlogTopic topic="announcements"></BlogTopic>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import HomeContentBlock from "./Comp-HomeContentBlock.vue";
import HeroImages from "./Comp-HeroImages.vue";
//import SearchBar from "./Comp-SearchBar.vue";
import BlogTopic from "./Comp-BlogTopic.vue";

export default {
  name: "PageHome",
  components: { 
    HomeContentBlock, 
    HeroImages, 
    //SearchBar, 
    BlogTopic },

  data() {
    return {
      home_content: {},
      index: 0,
      isLoaded: false,
      nothing: "",
    };
  },

  mounted() {
    //console.log("entered Home.mounted()");
    this.getHomeContent();
  },

  methods: {
    getHomeContent() {
      // console.log("entered getHomeContent()");
      this.isLoaded = false;
      fetch("/source/home.json", {
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
          //console.log("Home result = ", result);
          this.home_content = result;
          // console.log("home_content = ", this.home_content);
          this.isLoaded = true;
        })
        .catch(() => {
          //this.error = true;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* background-color is to help debug layout*/

.bottom-container {
  /* background-color: bisque; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 20px;
  width: 95%;
}

.flex-container {
  /* background-color: rgb(187, 255, 0); */
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 50%; */
}

.top-container {
  /* background-color: rgb(182, 184, 179); */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
  padding-bottom: 20px;
  width: 95%;
}

.bottom-blocks {
  flex: 2 2 25%;
  padding: 6px;
  border-style: solid;
  border-width: .5px;
  margin-left: auto;
  margin-right: auto;
}

a {
  color: #42b983;
}
</style>
