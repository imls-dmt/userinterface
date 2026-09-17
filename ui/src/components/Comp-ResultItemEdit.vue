<template>
  <div class="container">
    <div class="title">
      <span v-if="$route.name != 'Resource'">{{ index }}. </span>
      <router-link :to="`/Resource/${item.id}`"> {{ item.title }} </router-link>
      <img :src="license" class="license" />
      <img :src="access_cost" class="access_cost" />
    </div>
    <table class="metadata">
      <span class="authors">
        <tr>
          <td>
            <span v-if="item.authors.length == 1"><b>Author: </b></span>
            <span v-else-if="item.authors.length > 1"><b>Authors: </b></span>
          </td>
          <!-- https://stackoverflow.com/questions/42740105/vue-check-if-you-are-on-the-last-prop-of-a-v-for-loop -->
          <td>
            <span v-for="(author, index) in item.authors" :key="author">
              <span v-if="index != 0">, </span>
              {{ author.givenName }} {{ author.familyName }}
            </span>
          </td>
        </tr>
      </span>
      <div v-if="is_full">
        <tr>
          <td colspan="2">
            <span v-html="abstract_full"></span>
          </td>
        </tr>

        <tr class="detail_title">
          <td colspan="2">Key Information</td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">URL:</td>
          <td>
            <a :href="item.url" target="item">
              {{ item.url }}
            </a>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Authoring<br />Organization(s):</td>
          <td>
            {{ item.author_org.name }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">License:</td>
          <td>
            {{ item.license }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Access Cost:</td>
          <td>
            <span v-if="item.access_cost"> Fee </span>
            <span v-else> No fee </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Primary Language:</td>
          <td>
            <span v-if="item.language_primary == 'en'"> English </span>
            <span v-else> {{ item.language_primary }} </span>
          </td>
        </tr>

        <tr class="detail_title">
          <td colspan="2">Additional Information</td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Keywords:</td>
          <td>
            <span v-for="(key, index) in item.keywords" :key="key">
              <span v-if="index != 0">, </span>{{ key }}
            </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Subject Discipline:</td>
          <td>
            {{ item.subject }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Publisher:</td>
          <td>
            {{ item.Publisher }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Media Type:</td>
          <td>
            {{ item.media_type }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Contact<br />Organization(s):</td>
          <td>
            {{ item.contact.org }}
          </td>
        </tr>

        <tr class="detail_title">
          <td colspan="2">Educational Information</td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Purpose:</td>
          <td>
            {{ item.purpose }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Learning<br />Resource Type:</td>
          <td>
            {{ item.lr_type }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Target<br />Audience:</td>
          <td>
            <span v-for="(key, index) in item.target_audience" :key="key">
              <span v-if="index != 0">, </span>{{ key }}
            </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Intended time<br />to complete:</td>
          <td>
            {{ item.completion_time }}
          </td>
        </tr>

        <span v-if="item.ed_frameworks[0]">
          <tr class="detail_item">
            <td class="element-title">Framework:</td>
            <td>
              {{ item.ed_frameworks[0].name }}
            </td>
          </tr>
          <tr class="detail_item">
            <td class="element-title">Framework Node:</td>
            <td>
              <span
                v-for="(key, index) in item.ed_frameworks[0].nodes"
                :key="key"
              >
                <span v-if="index != 0">, </span>{{ key.name }}
              </span>
            </td>
          </tr>
        </span>

        <tr>
          <td class="diagnostic" colspan="2">
            <hr />
            {{ item.pub_status }} / {{ item.created }} -
            {{ item.modification_date }} / {{ item.id }} / {{ item.score }}
          </td>
        </tr>
      </div>

      <div v-else>
        <span v-html="abstract_short"></span>
      </div>
    </table>
    <div
      v-if="$route.name != 'Resource'"
      @click="toggleAbstract"
      class="toggle-action"
    >
      {{ resourceAction }}
    </div>
  </div>
</template>

<script>
import access_cost_true from "@/assets/fee.png";
import access_cost_false from "@/assets/no-fee.png";
import license_cc_by from "@/assets/cc-by.png";
import license_cc_by_sa from "@/assets/cc-by-sa.png";
import license_cc_publicdomain from "@/assets/cc-publicdomain.png";

export default {
  props: ["index", "item", "nResources", "initialFull"],

  name: "ResultItem",
  // licenses: {
  //     "CC BY 2.0": license_cc_by,
  //     "CC BY-SA 4.0": license_cc_by_sa,
  // },

  data() {
    return {
      abstract_full: "",
      abstract_short: "",
      access_cost: access_cost_false,
      error: false,
      license: null,
      results: [],
      is_full: false,
    };
  },

  computed: {
    resourceAction() {
      if (this.is_full) {
        console.log("show less");
        return "Show Less";
      } else {
        console.log("show more");
        return "Show More";
      }
    },
  },

  // Setup variables...
  mounted() {
    // console.log("ResultItem item : ", this.item);
    this.is_full = this.initialFull;
    this.abstract_full = this.item.abstract_data;
    this.abstract_short = this.item.abstract_data.substring(0, 300) + " ...";

    if (this.item.access_cost) this.access_cost = access_cost_true;

    if (this.item.license.includes("CC BY 2.0")) {
      this.license = license_cc_by;
    } else if (this.item.license.includes("CC BY-SA 4.0")) {
      this.license = license_cc_by_sa;
    } else if (this.item.license.includes("CC BY")) {
      this.license = license_cc_by;
    } else if (this.item.license.includes("Public Domain")) {
      this.license = license_cc_publicdomain;
    } else if (this.item.license.includes("YouTube")) {
      this.license = license_cc_by;
    } else {
      this.license = license_cc_by;
    }
  },

  methods: {
    toggleAbstract() {
      if (this.$route.name == "Search") {
        this.is_full = !this.is_full;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.access_cost {
  padding-left: 0.5em;
  width: 2%;
}

.authors {
  padding-bottom: 0.5em;
  padding-top: 0.3em;
}

.container {
  border-color: silver;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  margin-bottom: 10px;
  padding: 15px;
}

.detail_item {
  margin: 2px;
}

.detail_title {
  background-color: gainsboro;
  font-weight: bold;
  margin-bottom: 4px;
  padding-bottom: 0px;
}

.license {
  padding-left: 0.5em;
  width: 10%;
}

.title {
  border: none;
  color: blue;
  display: inline;
  font-size: x-large;
  font-style: normal;
  font-weight: bold;
  text-align: left;
}

.title:hover {
  cursor: pointer;
}

.toggle-action {
  text-align: right;
  color: blue;
  font-weight: normal;
}

.toggle-action:hover {
  cursor: pointer;
}

.element-title {
  font-weight: bold;
}

.diagnostic {
  font-size: xx-small;
}
</style>
