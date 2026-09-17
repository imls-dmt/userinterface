<template>
  <div v-if="state === 'loaded'" :class="wrapperClass" v-html="html"></div>
  <div v-else-if="state === 'error'" :class="wrapperClass" class="content-error">
    {{ block.title || "Content" }} could not be loaded.
  </div>
  <div v-else :class="wrapperClass">{{ block.title }} (loading content...)</div>
</template>

<script>
// Fetches a markdown file named by block.content (a path under /source/ on the
// same origin, served from the ui-static-content repository) and renders it
// as sanitized HTML. Replaces the four former *ContentBlock components.
import { renderMarkdown } from "../utils/markdown";

export default {
  name: "MarkdownBlock",
  props: {
    block: { type: Object, required: true },
    wrapperClass: { type: String, default: "content" },
  },
  data() {
    return { html: "", state: "loading" };
  },
  watch: {
    "block.content": "load",
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.state = "loading";
      if (!this.block || !this.block.content) {
        this.state = "error";
        return;
      }
      try {
        const response = await fetch(this.block.content, { method: "GET" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        this.html = renderMarkdown(await response.text());
        this.state = "loaded";
      } catch (err) {
        console.warn("MarkdownBlock: failed to load", this.block.content, err);
        this.state = "error";
      }
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0px 30px 10px;
  flex: 1 1 200px;
}
.content-error {
  color: #7a1f1f;
  font-style: italic;
}
</style>
