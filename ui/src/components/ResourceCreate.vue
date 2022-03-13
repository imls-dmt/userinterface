<template>
  <div :key="componentKey"> <!-- this will allow me to trigger a reload of the whole component by changing the componentKey value -->
    <div
      v-if="
        groups.includes('admin') ||
        groups.includes('editor') ||
        groups.includes('reviewer') ||
        groups.includes('submitter')
      ">
      <h2>Advanced submission form for registering a new learning resource</h2>
      <div>
        <Form id="metadataForm">
          <button type="button" class="flexiButton" @click="handleSubmission">Submit new learning resource information</button>
          <button type="button" class="flexiButton" @click="loadDemoResource">Load demo resource values</button>
          <div
            v-for="(group, index) in this.advancedMetadataFields"
            :key="index"
          >
            <div class="form-section-head">{{ group['groupTitle'] }}</div>
            
            <!-- Handle specialized field groups -->
            <div v-if="group['group'] == 'authors'">
              <MetaElementAuthors
                :template="flatMetadata"
                :authorFields="group['fields']" />
            </div>
            
            <div v-else-if="group['group'] == 'contributors'">
              <MetaElementContributors
                :template="flatMetadata"
                :contributorFields="group['fields']" />
            </div>
            
            <div v-else-if="group['group'] == 'contributor_orgs'">
              <MetaElementContributorOrgs
                :template="flatMetadata"
                :contributorOrgFields="group['fields']" />
            </div>

            <div v-else-if="group['group'] == 'ed_frameworks'">
              <MetaElementFrameworks
                :template="flatMetadata"
                :frameworkFields="group['fields']" />
            </div>
            
            
            <!-- Handle the rest of the field groups using default processing -->
            <div v-else>
              <div v-for="field in group['fields']" :key="field">
                <MetaElement 
                  :element='flatMetadata[field]'
                  :fieldName='field' />
                <p class="diagnostic"> {{ flatMetadata[field] }} </p>
              </div>
            </div>
            
          </div>
        </Form>
      </div>
    </div>

    <div v-else-if="groups.includes('lauth')">Basic submission form</div>

    <div v-else>
      Your assigned group is not authorized to submit new learning resources.
    </div>
    
    <span v-if="!loggedin"
      ><p>
        <router-link :to="{ name: 'Login' }">Login</router-link> to create and
        submit a new learning resource.
      </p></span
    >
    <span v-else>
      <hr/>
      You are logged in as <b>{{ username }}</b
      >, and your assigned groups are
      <span v-for="(group, index) in groups" :key="index">
        <span v-if="index > 0">, </span>
        <b>{{ group }}</b>
      </span>
    </span>
    
    
  </div>
</template>


<script>
import { Form } from "vee-validate";
//import * as yup from "yup";
import { mapGetters } from "vuex";
import MetaElement from "./metaElement.vue";
import MetaElementAuthors from "./metaElementAuthors.vue";
import MetaElementContributors from "./metaElementContributors.vue";
import MetaElementContributorOrgs from "./metaElementContributorOrgs.vue";
import MetaElementFrameworks from "./metaElementFrameworks.vue";
import DemoResource from "../json/demoResource.json";
import { inject } from 'vue';
import axios from 'axios';

export default {
  name: "ResourceCreate",
  props: {resourceID:{default: ""}},
  components: {
    MetaElement,
    MetaElementAuthors,
    MetaElementContributors,
    MetaElementContributorOrgs,
    MetaElementFrameworks,
    Form,
  },

  async setup () {
    let apibase = inject('$appApiBase');
    let fetchBase = "/api/resource/?metadata=true"
    async function fetchTemplate() {
      console.log("entering fetchTemplate");
      let fetchURL = apibase.concat(fetchBase);
      console.log("Request URL: ", fetchURL);
      const res = await fetch(fetchURL, {method: "GET"});
      return res.json()
    }
    function buildMetadataForRendering(metadata) {
      // refactor grouped metadata object into flat/combined group-field keys and expanded content
      console.log("metadta passed to buildMetatadataForRendering")
      console.log(metadata)
      let flatMetadata = {};
      let keyName = "";
      for (let group in metadata) {
        for (let element in metadata[group]["fields"]) {
          if ("name" in metadata[group]["fields"][element]) {
            keyName = metadata[group]["name"] + "___" + metadata[group]["fields"][element]["name"];
          } else if ("facet" in metadata[group]["fields"][element]) {
            keyName = metadata[group]["name"] + "___" + metadata[group]["fields"][element]["facet"];
          } else {
            keyName = metadata[group]["name"] + "___undefined";
          }
          keyName = keyName.replace(".", "__");
          flatMetadata[keyName] = metadata[group]["fields"][element];
          flatMetadata[keyName]["keyName"] = keyName;
        }
      }
      console.log(flatMetadata);
      return flatMetadata
    }
    const metadata = await fetchTemplate();
    console.log(metadata)
    const flatMetadata = buildMetadataForRendering(metadata);
    return {
      metadata,
      flatMetadata
    }
  },

  data() {
    //const schema = yup.object().shape({
    //  title: yup.string().required("Title is required!"),
    //  url: yup.string().required("Resource URL is required!"),
    //});
    return {
      componentKey: 0,
      isLoaded: false,
      apiBase: inject('$appApiBase'),
      localResourceID: this.resourceID,
      //fetchBase: "/api/resource/?metadata=true",
      //fetchURL: "",
      //metadata: {},
      //flatMetadata: {},
      //keyName: "",
      //schema,
      demoResource: DemoResource,
      basicMetadataFields: [
        {
          "group": "general",
          "groupTitle": "Core Information",
          "fields": [
            "general___submitter_name",
            "general___submitter_email",
            "general___title",
            "general___url",
            "access_constraints___access_cost",
          ]              
        },        
      ],
      baseMetadataForRendering: [],
      advancedMetadataFields: [
        {
          "group": "general",
          "groupTitle": "Core Information",
          "fields": [
            "general___submitter_name",
            "general___submitter_email",
            "general___title",
            "general___abstract_data",
            "general___keywords",
            "general___url",
            "general___citation",
            "general___language_primary",
            "general___languages_secondary",
            "general___media_type",
            "general___completion_time",
            "general___publisher",
            "general___resource_modification_date",
            "general___usage_info",
            "access_constraints___access_cost",              
          ],
        },
        {
          "group": "authors",
          "groupTitle": "Authors",
          "fields": [
            "authors___authors__givenName",        
            "authors___authors__familyName",        
            "authors___authors__name_identifier",        
            "authors___authors__name_identifier_type",                
          ],
        },
        {
          "group": "author_org",
          "groupTitle": "Authoring Organization",
          "fields": [
            "authors___author_org__name",        
            "authors___author_org__name_identifier",        
            "authors___author_org__name_identifier_type",               
          ],
        },
        {
          "group": "contributors",
          "groupTitle": "Contributors",
          "fields": [
            "contributors___contributors__familyName",        
            "contributors___contributors__givenName", 
            "contributors___contributors__type",
          ],
        },
        {
          "group": "contributor_orgs",
          "groupTitle": "Contributing Organizations",
          "fields": [
            "contributors___contributor_orgs__name",
            "contributors___contributor_orgs__type",
          ],
        },
        {
          "group": "educational_information",
          "groupTitle": "Educational Information",
          "fields": [
            "educational_information___lr_type",        
            "educational_information___purpose", 
            "educational_information___subject",
            "educational_information___target_audience",
          ],
        },
        {
          "group": "ed_frameworks",
          "groupTitle": "Educational Frameworks",
          "fields": [
            "educational_information___ed_frameworks__name",        
            "educational_information___ed_frameworks__nodes__name", 
            //"educational_information___ed_frameworks__nodes__description", - deleted because it is not currently used
          ],
        },
        {
          "group": "resource_contact",
          "groupTitle": "Resource Contact Information",
          "fields": [
            "resource_contact___contact__name",        
            "resource_contact___contact__org",              
            "resource_contact___contact__email",              
          ],
        },
        {
          "group": "access_conditions",
          "groupTitle": "Access Conditions",
          "fields": [
            "access_conditions___license",              
          ],
        },
        {
          "group": "accessibility",
          "groupTitle": "Accessibiilty Features",
          "fields": [
            "accessibility___accessibility_features__name",        
            "accessibility___accessibility_summary",              
          ],
        },
        {
          "group": "resource_location",
          "groupTitle": "Resource Location Identifier",
          "fields": [
            "resource_location___locator_data",        
            "resource_location___locator_type",              
          ],
        },
      ],
      advancedMetadataForRendering: [],
    };
  },

  created() {
    console.log("Metadata: ", this.metadata)
    console.log("Flat Metadata: ", this.flattMetadata)
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
    genUUID() {return self.crypto.randomUUID()},
    handleSubmission() {
      console.log("entering handleSubmission");
      var elements = document.getElementById('metadataForm').elements
      var fieldValues = {}
      var returnObject = {}
      //console.log(elements)
      for (let element in elements) {
        fieldValues[elements[element].id] = elements[element].value
        //console.log(fieldValues[elements[element].name])
      }
      console.log(fieldValues)
      
      // populate the return object with values for submission
      returnObject['title'] = fieldValues['general___title']
      returnObject['url'] = fieldValues['general___url']
      returnObject['access_cost'] = fieldValues['access_constraints___access_cost']
      returnObject['submitter_name'] = fieldValues['general___submitter_name']
      returnObject['submitter_email'] = fieldValues['general___submitter_email']
      //authors =================================
      var authorElements = document.getElementById("metadataForm").elements
      var authorsSet = new Set() // need to first create a set to eliminate duplicates
      for (let element in authorElements) {
        if (typeof(authorElements[element].id) !== 'undefined' && authorElements[element].id.startsWith('authors-list-')) {
          authorsSet.add(authorElements[element].value)
        }
      }
      var authorsArr = Array.from(authorsSet)
      var authorsList = []
      for (let element in authorsArr) {
        authorsList.push(JSON.parse(authorsArr[element]))
      }
      returnObject['authors'] = authorsList
      //=========================================
      returnObject['author_org'] = {}
      returnObject['author_org']['name'] = fieldValues['authors___author_org__name-datalist']
      returnObject['author_org']['name_identifier'] = fieldValues['authors___author_org__name_identifier']
      returnObject['author_org']['name_identifier_type'] = fieldValues['authors___author_org__name_identifier_type']
      returnObject['contact'] = {}
      returnObject['contact']['name'] = fieldValues['resource_contact___contact__name']
      returnObject['contact']['org'] = fieldValues['resource_contact___contact__org']
      returnObject['contact']['email'] = fieldValues['resource_contact___contact__email']
      returnObject['abstract_data'] = fieldValues['general___abstract_data']
      returnObject['subject'] = fieldValues['educational_information___subject-datalist']
      //keywords ================================
      var keywordsElements = document.getElementById("metadataForm").elements
      var keywordsSet = new Set() // need to first create a set to eliminate duplicates
      for (let element in keywordsElements) {
        if (typeof(keywordsElements[element].id) !== 'undefined' && keywordsElements[element].id.startsWith('general___keywords-datalist-')) {
          keywordsSet.add(keywordsElements[element].value)
        }
      }
      var keywordsList = Array.from(keywordsSet)
      returnObject['keywords'] = keywordsList
      //=========================================
      returnObject['license'] = fieldValues['access_conditions___license-datalist']
      returnObject['usage_info'] = fieldValues['general___usage_info-datalist']
      returnObject['citation'] = fieldValues['general___citation']
      returnObject['locator_data'] = fieldValues['resource_location___locator_data']
      returnObject['locatortype'] = fieldValues['resource_location___locator_type']
      returnObject['publisher'] = fieldValues['general___publisher-datalist']
      returnObject['accesibility_features'] = fieldValues['accessibility___accessibility_features__name']
      // accessibility features =================
      var accessibilityElement = document.getElementById('accessibility___accessibility_features__name');
      var selectedAccessibilityOptions = [...accessibilityElement.selectedOptions]
                      .map(option => option.value);
      returnObject['accesibility_features'] = selectedAccessibilityOptions
      //=========================================
      returnObject['accesibility_summary'] = fieldValues['accessibility___accessibility_summary']
      returnObject['language_primary'] = fieldValues['general___language_primary-datalist']
      // languages secondary ====================
      var languagesSecondaryElement = document.getElementById('general___languages_secondary');
      var languagesSecondaryOptions = [...languagesSecondaryElement.selectedOptions]
                      .map(option => option.value);
      returnObject['languages_secondary'] = languagesSecondaryOptions
      //=========================================
      //educational frameworks ==================
      var frameworkElements = document.getElementById("metadataForm").elements
      var frameworkSet = new Set() // need to first create a set to eliminate duplicates
      for (let element in frameworkElements) {
        if (typeof(frameworkElements[element].id) !== 'undefined' && frameworkElements[element].id.startsWith('frameworks-list-')) {
          frameworkSet.add(frameworkElements[element].value)
        }
      }
      var frameworkArr = Array.from(frameworkSet)
      var frameworkList = []
      for (let element in frameworkArr) {
        frameworkList.push(JSON.parse(frameworkArr[element]))
      }
      returnObject['ed_frameworks'] = frameworkList
      //=========================================
      // target audience ========================
      var targetAudienceElements = document.getElementById("metadataForm").elements
      var targetAudienceSet = new Set() // need to first create a set to eliminate duplicates
      for (let element in targetAudienceElements) {
        if (typeof(targetAudienceElements[element].id) !== 'undefined' && targetAudienceElements[element].id.startsWith('educational_information___target_audience-datalist-')) {
          targetAudienceSet.add(targetAudienceElements[element].value)
        }
      }
      var targetAudienceList = Array.from(targetAudienceSet)
      returnObject['target_audience'] = targetAudienceList
      //=========================================
      returnObject['purpose'] = fieldValues['educational_information___purpose-datalist']
      returnObject['completion_time'] = fieldValues['general___completion_time']
      returnObject['media_type'] = fieldValues['general___media_type-datalist']
      returnObject['lr_type'] = fieldValues['educational_information___lr_type-datalist']
      //contributors ============================
      var contributorElements = document.getElementById("metadataForm").elements
      var contributorSet = new Set() // need to first create a set to eliminate duplicates
      for (let element in contributorElements) {
        if (typeof(contributorElements[element].id) !== 'undefined' && contributorElements[element].id.startsWith('contributors-list-')) {
          contributorSet.add(contributorElements[element].value)
        }
      }
      var contributorArr = Array.from(contributorSet)
      var contributorList = []
      for (let element in contributorArr) {
        contributorList.push(JSON.parse(contributorArr[element]))
      }
      returnObject['contributors'] = contributorList
      //=========================================
      //contributor orgs ========================
      var contributorOrgElements = document.getElementById("metadataForm").elements
      var contributorOrgSet = new Set() // need to first create a set to eliminate duplicates
      for (let element in contributorOrgElements) {
        if (typeof(contributorOrgElements[element].id) !== 'undefined' && contributorOrgElements[element].id.startsWith('contributorOrgs-list-')) {
          contributorOrgSet.add(contributorOrgElements[element].value)
        }
      }
      var contributorOrgArr = Array.from(contributorOrgSet)
      var contributorOrgList = []
      for (let element in contributorOrgArr) {
        contributorOrgList.push(JSON.parse(contributorOrgArr[element]))
      }
      returnObject['contributor_orgs'] = contributorOrgList
      //=========================================
      
      // the resource ID will be added to the metadata if an existing record is being edited instead
      // of a new resource being created. 
      // DISABLED until PUT update method is confirmed and tested
      returnObject['id'] = ""
      let submitMethod = "POST"
      //if (this.localResourceID !== "") {
      //  returnObject['id'] = this.localResourceID
      //  submitMethod = "PUT"
      //}
                  
      console.log(returnObject)
      
      // submit the generated metadata to create/update resource
      let apibase = this.apiBase;
      let url = apibase.concat('/api/resource/');
      console.log(url);
      axios({
        url: url,
        method: submitMethod,
        data: returnObject, 
        withCredentials: true
      }).then(response => {
          if (response.data) {
            console.log(response.data)
          }
          console.log(response.data);
          if (response.data['status'] == "success") {
            this.localResourceID = response.data['doc']['id'];
            console.log(this.localResourceID);
            alert("Success, your submission was added to the processing queue with resource ID: " + this.localResourceID + ".\n\nYou may now submit a new learning resource.");
            this.componentKey += 1;
          } else {
            console.log(response.data)
            alert("Your submission failed with an error of: ", response.data['message'])
          }
        });
    },
    flexTableAdd(tableID, groupPrefix, values) {
      let workingTable = document.getElementById(tableID)
      // clear out all but the header row
      let rowCount = workingTable.rows.length;
      for (let i = rowCount - 1; i > 0; i--) {
          workingTable.deleteRow(i);
      }
      // loop through the objects and process each one into a table row
      for (let index in values) {
        const checkboxID = groupPrefix + "-" + self.crypto.randomUUID()
        if (values !== "n/a") {
          let newRow = workingTable.insertRow()
          let newCell = newRow.insertCell();
          let newInput = document.createElement('input')
          let newLabel = document.createElement('label')
          newInput.setAttribute('type', 'checkbox')
          newInput.setAttribute('id', checkboxID)
          newInput.setAttribute('value', JSON.stringify(values[index]))
          newInput.setAttribute('checked', "")
          newCell.appendChild(newInput)
          
          let insertValue = ""
          //console.log(values[index])
          for (let value in values[index]) {
            //console.log(values[index][value])
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(values[index][value])
            if (tableID == "frameworks_table" && value == "nodes") {
              //console.log(value, ": frameworks_table name: ", values[index][value])
              let nodes = []
              for (let nodeIndex in values[index][value]) {
                //console.log("node: ", values[index][value][nodeIndex]['name'])
                nodes.push(values[index][value][nodeIndex]['name'])
              }
              newText = document.createTextNode(nodes.join().replace(",", ", "))
              //newText = document.createTextNode(JSON.stringify(values[index][value]))
            }
            newCell.appendChild(newText)
          }
        }
      }
    },
    flexDataListAdd(elementKey, checkboxValue) {
      const dlID = elementKey + "-datalist";
      const dlID_selector = "#" + dlID;
      const listID = elementKey + "-list"
      const checkboxName = dlID + "-values"
      const Value = JSON.stringify(checkboxValue);
      const checkboxID = dlID + "-" + self.crypto.randomUUID()
      //console.log(dlID)
      //console.log(Value)
      if (Value !== "") {
        if (document.getElementById(listID).innerHTML == "This is where the selected items will be displayed") {
          document.getElementById(listID).innerHTML = "<input type=checkbox name=" + checkboxName + 
          " id=" + checkboxID +
          " value=" + Value +
          " checked class='flexdatalist_checkbox'/>" + 
          " <label for=" + checkboxID + ">" + Value + "</label>"
        } else {
          document.getElementById(listID).innerHTML += "<br/><input type=checkbox name=" + checkboxName + 
            " id=" + checkboxID +
            " value=" + Value +
            " checked class='flexdatalist_checkbox'/>" + 
            " <label for=" + checkboxID + ">" + Value + "</label>"
        }
      } else {
        alert("You must select or enter a value before adding it to the list.")
      }
    },
    loadDemoResource() {
      //console.log("Entering loadDemoResource")
      //console.log(this.demoResource);
      let resource = this.demoResource['results'][0];
      //console.log(resource)
      let elements = document.getElementById('metadataForm').elements
      //console.log("elements: ", elements)
      //elements = Array.from([...new Set(elements)])// retain only the unique elements to remove any duplicates
      //console.log(elements)
      let elementSubs = []
      let elementSub = ""
      for (let element in elements) {
        let elementID = elements[element].id
        
        // process each element to generate the name/key for processing against demo metadata
        if (typeof elementID !== 'undefined' && !(elementID.includes('button')) && elements[element].type !== 'button') {
          if (elements[element].id.split('___').length == 2) {elementSub = elements[element].id.split('___')[1]}
          else {elementSub = elements[element].id}
          elementSubs.push([elementSub, elements[element].name, elements[element].type, elements[element].value])
        
          // process different fields based on their element name/key
          if (elementSub == 'submitter_name') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'submitter_email') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'title') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'abstract_data') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'keywords-datalist') {
            //console.log("keywords-datalist: ", elements[element].id)
            let elementKey = elements[elementID].id
            elementKey = elementKey.replace('-datalist', '')
            document.getElementById(elementKey + '-list').innerHTML = "This is where the selected items will be displayed"
            for (let index in resource['keywords']) {
              this.flexDataListAdd(elementKey, resource['keywords'][index]) 
            }
          
          } else if (elementSub == 'url') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'citation') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'language_primary-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'languages_secondary') {
            //console.log("languages_secondary: ", elements[element].id)
            let values = resource[elementSub];
            let options = Array.from(document.querySelectorAll('#general___languages_secondary option'));
            //console.log(options)
            values.forEach(function(v) {
              //console.log(v)
              options.find(c => c.value == v).selected = true;
            });
            options.find(c => c.value == "n/a").selected = false;
          
          } else if (elementSub == 'media_type-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'completion_time') {
          //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
          elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'publisher-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'resource_modification_date') {
            let date = resource[elementSub].substring(0, 10)
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = date
          
          } else if (elementSub == 'usage_info-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'access_cost') {
            
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", (resource[elementSub] == 1))
            elements[elementID].value = (resource[elementSub] == 1)
          
          } else if (elementSub == 'author_org__name-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource['author_org']['name'])
            elements[elementID].value = resource['author_org']['name']
          
          } else if (elementSub == 'author_org__name_identifier') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource['author_org']['name_identifier'])
            elements[elementID].value = resource['author_org']['name_identifier']
          
          } else if (elementSub == 'author_org__name_identifier_type') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource['author_org']['name_identifier_type'])
            elements[elementID].value = resource['author_org']['name_identifier_type']
            
          } else if (elementSub == 'lr_type-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'purpose-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'subject-datalist') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub.replace('-datalist', '')])
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'target_audience-datalist') {
            //console.log("target_audience-datalist: ", elements[element].id)
            let elementKey = elements[elementID].id
            elementKey = elementKey.replace('-datalist', '')
            document.getElementById(elementKey + '-list').innerHTML = "This is where the selected items will be displayed"
            for (let index in resource['target_audience']) {
              this.flexDataListAdd(elementKey, resource['target_audience'][index]) 
            }
          
          } else if (elementSub == 'contact__name') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource['contact']['name']
          
          } else if (elementSub == 'contact__org') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource['contact']['org']
          
          } else if (elementSub == 'contact__email') {
          //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
          elements[elementID].value = resource['contact']['email']
          
          } else if (elementSub == 'license-datalist') {
          //console.log("license-datalist: ", elements[element].id)
          elements[elementID].value = resource[elementSub.replace('-datalist', '')]
          
          } else if (elementSub == 'license-datalist') {
            //console.log("license-datalist: ", elements[element].id)
            elements[elementID].value = resource[elementSub.replace('-datalist', '')]

          } else if (elementSub == 'accessibility_features__name') {
            //console.log("accessibility features name: ", elements[element].id)
            let values = resource['accessibility_features'];
            let options = Array.from(document.querySelectorAll('#accessibility___accessibility_features__name option'));
            //console.log(options)
            values.forEach(function(v) {
              //console.log(v)
              options.find(c => c.value == v).selected = true;
            });
            options.find(c => c.value == "n/a").selected = false;

          } else if (elementSub == 'accessibility_summary') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'locator_data') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else if (elementSub == 'locator_type') {
            //console.log(element, ": ", elementSub, ": Corresponding metadata value: ", resource[elementSub])
            elements[elementID].value = resource[elementSub]
          
          } else {
            console.log(element, ":  was skipped")
          }
        
        
        } else {
          console.log(elementID, " : was ignored")
        }
        
        // Process our special field collections
        // Authors
        if (resource["authors"].length > 0) {
          this.flexTableAdd("author_table", "authors-list", resource["authors"])
        }

        // Contributors
        if (resource["contributors"].length > 0) {
          this.flexTableAdd("contributors_table", "contributors-list", resource["contributors"])
        }
        
        // Contributor orgs
        if (resource["contributor_orgs"].length > 0) {
          this.flexTableAdd("contributorOrgs_table", "contributorOrgs-list", resource["contributor_orgs"])
        }
        // Educational frameworks
        if (resource["ed_frameworks"].length > 0) {
          //console.log()
          this.flexTableAdd("frameworks_table", "frameworks-list", resource["ed_frameworks"])
        }
      }
      console.log(elementSubs)
    }
  },
};
</script>

<style scoped></style>
