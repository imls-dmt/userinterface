<template>
  <div class="container">
    <auths  :key="reloads"
    :local_groups="local_groups"
    :local_auths="local_auths"
    :resourceID="id"></auths>
    
    <div class="stars">
        <img class="stars_image" src="@/assets/five-star.png"  v-bind:style="{marginLeft: starsLeftMargin + 'px', zIndex: 1}" />
        <img class="stars_image" src="@/assets/110x20-white.png" v-bind:style="{ marginLeft: starsLeftMargin+(starsWidth*item.rating/5) + 'px', zIndex: 2}" />
        <img class="stars_image" src="@/assets/five-star-hollow.png"  v-bind:style="{marginLeft: starsLeftMargin + 'px', zIndex: 3}"/> 
        <div v-if="item.rating > 0" v-bind:style="{ zIndex: 4 }">{{ item.rating.toFixed(1) }}</div>
        <div v-else v-bind:style="{ zIndex: 4 }">n/a</div>
    </div>

    <div class="title">
      <router-link :to="`/Resource/${item.id}`"> {{ item.title }} </router-link>
      <img :src="license" class="license, icon" />
      <img :src="access_cost" class="access_cost, icon" />
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
          <td class="element-title">Authoring Organization(s):</td>
          <td>
            {{ item.author_org.name }}
            <span v-if="item.author_org.name_identifier != ''"> ({{ item.author_org.name_identifier }})</span>
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
              <span v-if="index != 0"><br /></span>{{ key }}
            </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Subject Discipline:</td>
          <td>
            <span v-for="(key, index) in item.subject" :key="key">
              <span v-if="index != 0"><br /></span>{{ key }}
            </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Publisher:</td>
          <td>
            {{ item.publisher }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Learning Resource Type:</td>
          <td>
            {{ item.lr_type }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Media Type:</td>
          <td>
            {{ item.media_type }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Contact Organization(s):</td>
          <td>
            {{ item.contact.org }}
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Contact Name:</td>
          <td>
            {{ item.contact.name }}
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Contact email:</td>
          <td>
            {{ item.contact.email }}
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Usage Information:</td>
          <td>
            {{ item.usage_info }}
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Citation:</td>
          <td>
            {{ item.citation }}
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Locator Data:</td>
          <td>
            {{ item.locator_data }} <span v-if="item.locator_data != ''">({{ item.locator_type}})</span>
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Accesibility Summary:</td>
          <td>
            {{ item.accesibility_summary }}
          </td>
        </tr>
        <tr class="detail_item">
          <td class="element-title">Secondary Languages:</td>
          <td>
            <span v-for="(key, index) in item.languages_secondary" :key="key">
              <span v-if="index != 0">, </span>{{ key }}
            </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Access Conditions:</td>
          <td>
            {{ item.access_conditions }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Expertise Level:</td>
          <td>
            {{ item.expertise_level }}
          </td>
        </tr>
        
        <tr class="detail_item">
          <td class="element-title">Country of Origin:</td>
          <td>
            {{ item.country_of_origin }}
          </td>
        </tr>
        
        <tr>
          <td class="element-title">Contributors:</td>
          <td>
            <span v-for="(contributor, index) in item.contributors" :key="contributor">
              <span v-if="index != 0">, </span>
              {{ contributor.givenName }} {{ contributor.familyName }} <span v-if="contributor.type != ''">({{ contributor.type }})</span>
            </span>
          </td>
        </tr>

        <tr>
          <td class="element-title">Contributing Organizations:</td>
          <td>
            <span v-for="(contributor, index) in item.contributor_orgs" :key="contributor">
              <span v-if="index != 0"><br /></span>
              {{ contributor.name }} <span v-if="contributor.name_identifier != 'N.A.'">({{ contributor.name_identifier }})</span> <span v-if="contributor.type != ''"> - {{ contributor.type }}</span>
            </span>
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
          <td class="element-title">Credential Status:</td>
          <td>
            {{ item.credential_status }}
          </td>
        </tr>
        
        <tr class="detail_item">
          <td class="element-title">Learning Resource Type:</td>
          <td>
            {{ item.lr_type }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Target Audience:</td>
          <td>
            <span v-for="(key, index) in item.target_audience" :key="key">
              <span v-if="index != 0"><br /></span>{{ key }}
            </span>
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Intended time to complete:</td>
          <td>
            {{ item.completion_time }}
          </td>
        </tr>

        <tr class="detail_item">
          <td class="element-title">Learning Outcomes:</td>
          <td>
            {{ item.lr_outcomes }}
          </td>
        </tr>
        
           <tr class="detail_item">
            <td class="element-title">Educational Framework(s):</td>
            <td>
              <span v-for="(key, index) in item.ed_frameworks" :key="key">
                <span v-if="index != 0"><br /></span>{{ key['name'] }} 
                (
                <span v-for="(key, index) in key['nodes']" :key="key">
                  <span v-if="index != 0">, </span>{{ key }}
                </span>
                )
              </span>
            </td>
          </tr>

        <tr>
          <td class="diagnostic" colspan="2">
            <hr />
            {{ item.id }} / {{item.status}} / {{ item.pub_status }} / {{ item.created }} -
            {{ item.modification_date }} / {{ item.score }}
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
import access_cost_true from "@/assets/noun-money-3749301_modified.png";
import access_cost_false from "@/assets/noun-money-free-3749255.png";
import license_cc_by from "@/assets/cc-by.png";
import license_cc_by_sa from "@/assets/cc-by-sa.png";
import license_cc_publicdomain from "@/assets/cc-publicdomain.png";
import { mapGetters } from "vuex";
import auths from "./auths.vue"

export default {
  props: ["index", "item", "nResources", "initialFull", "id"],
  components: {auths},
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
      starsWidth: 92,
      starsLeftMargin: 30,
    };
  },

  computed: {
    ...mapGetters(["loggedin", "username", "groups", "auth"]),
    local_groups() {
      return this.$store.getters.groups;
    },
    local_auths() {
      return this.$store.getters.auth;
    },
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
  text-align: right;
  padding-right: 10px;
  width: 175px;
}

.diagnostic {
  font-size: xx-small;
}

.stars_container {
    position: static;
    min-height: 20px;
    top: 0px;
    right: 0px;
}

.stars {
    position: static;
    top: 0px;
    left: 0px;
}

.stars_image {
    position: absolute;
    width: 92px;
    height:20px;    

}

</style>
