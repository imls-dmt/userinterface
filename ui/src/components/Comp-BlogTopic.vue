<template>
  <div class="blog-item">
    <div v-for="item in items" :key="item.date">
      <h3 class="blog-title">{{ item.title }}</h3>
      <p class="blog-date">&nbsp;- {{ item.date.substring(0,10) }}</p>
      <MarkdownBlock :block="item" wrapper-class="blog-content"></MarkdownBlock>
    </div>
  </div>
</template>

<script>
import MarkdownBlock from "./Comp-MarkdownBlock.vue";
export default {
  name: "BlogTopic",
  props: {
    topic: String, // either "features", "news", or "announcements"
  },
  //
  components: { MarkdownBlock },
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
      console.log(this.$blog);
      console.log("retrieving blog metadata");
      fetch("/source/blog.json", {
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
          this.$blog = result;
          console.log(this.$blog);
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
