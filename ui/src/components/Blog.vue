<template>
  <div>
    <div>
      <div>
        <h1>Featured Resources</h1>
        <BlogTopic topic="features"></BlogTopic>
      </div>
      <div>
        <h1>Recent News Items</h1>
        <BlogTopic topic="news"></BlogTopic>
      </div>
      <div>
        <h1>Announcements</h1>
        <BlogTopic topic="announcements"></BlogTopic>
      </div>
    </div>
  </div>
</template>

<script>
import BlogTopic from "./BlogTopic.vue";
export default {
  name: "Blog",
  components: { BlogTopic },
};
</script>

<style scoped></style>
