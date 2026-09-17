// Markdown rendering and HTML sanitizing for content that did not originate
// in this code base: markdown files from the ui-static-content repository and
// free-text fields (abstracts) entered by resource submitters.
//
// Every string returned by these helpers has passed through DOMPurify, so it
// is safe to bind with v-html. Nothing in the app should use v-html with a
// string that did not come from here.
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.use({
  gfm: true,        // tables, strikethrough, autolinks, as GitHub renders the source files
  breaks: false,
  async: false,
});

// Links that leave the site open in a new tab without a window.opener handle.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.hasAttribute("href")) {
    const href = node.getAttribute("href");
    if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  }
});

const PURIFY_OPTIONS = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ["style", "form", "input", "button"],
  FORBID_ATTR: ["style", "onerror", "onload"],
};

/** Render markdown source to sanitized HTML. */
export function renderMarkdown(source) {
  const html = marked.parse(source || "");
  return DOMPurify.sanitize(html, PURIFY_OPTIONS);
}

/** Sanitize HTML that is already HTML (e.g. an abstract stored with markup). */
export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html || "", PURIFY_OPTIONS);
}

/** Plain-text excerpt of an HTML string, cut at a word boundary. */
export function textExcerpt(html, maxChars = 300) {
  const text = DOMPurify.sanitize(html || "", { ALLOWED_TAGS: [], KEEP_CONTENT: true })
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxChars) return text;
  const cut = text.lastIndexOf(" ", maxChars);
  return text.slice(0, cut > maxChars / 2 ? cut : maxChars) + " ...";
}
