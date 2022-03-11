<template>
  <div>
    <div v-for="field in frameworkFields" :key="field">
      <MetaElement 
        :element='template[field]'
        :fieldName='field' />
    </div>
    <button type="button" class="flexiButton" @click="frameworkAdd">Combine entries and add them to the educational framework list</button>
    <div id="frameworks-list" class="flexiList">
      <h3>Frameworks list</h3>
      <p>Uncheck a row in the list to prevent its inclusion in the submission.</p>
      <table id="frameworks_table">
        <tr>
          <th>&nbsp;</th>
          <th v-for="field in frameworkFields" :key="field">{{ template[field]['label'] }}</th>
        </tr>
      </table>
      
    </div>
  
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
import MetaElement from "./metaElement.vue";
export default {
  props: ["template", "frameworkFields"],
  
  name: "MetaElementFrameworks",
  components: {
    MetaElement
  //		Field,
  //		ErrorMessage,
  },
  data() {
    return {
      values: [],
    };
  },
  methods: {
    frameworkAdd(event) {
      const listID = "frameworks-list"
      const checkboxName = "frameworks-values"
      let values = {} // the delimited string of individual values
      let valuesList = [] // the array of individual values
      let field_selector = ""
      for (let fieldIndex in this.frameworkFields) {
        let value = "" // the individual values associated with each field
        let field = this.frameworkFields[fieldIndex]
        let submissionField = field.replace('educational_information___ed_frameworks__', '')
        //console.log(field)
        field_selector = "#" + field
        //console.log(this.authorFields[fieldIndex])
        //console.log(this.template[field]['element'])
        //console.log("Select element")
        let sel = document.getElementById(field)
        value = [...sel.options]
         .filter(x => x.selected)
         .map(x => x.value);
        //value = sel.options[sel.selectedIndex].text
        
        console.log(value)
        valuesList.push(value)
        values[submissionField] = value
      }
      console.log(values)
      var submitValue = {};
      submitValue['name'] = values['name'][0];
      submitValue['nodes'] = [];
      for (let nodeIndex in values['nodes__name']) {
        console.log(nodeIndex, ": ", submitValue['name'], ": ", values['nodes__name'][nodeIndex])
        submitValue['nodes'].push({"description":"", "name":values['nodes__name'][nodeIndex]})
      }
      console.log(submitValue);
      const checkboxID = listID + "-" + self.crypto.randomUUID();
      if (values !== "n/a") {
        let myTable = document.getElementById('frameworks_table')
        let newRow = myTable.insertRow()
        let newCell = newRow.insertCell();
        let newInput = document.createElement('input')
        let newLabel = document.createElement('label')
        newInput.setAttribute('type', 'checkbox')
        newInput.setAttribute('id', checkboxID)
        newInput.setAttribute('value', JSON.stringify(submitValue))
        newInput.setAttribute('checked', "")
        newCell.appendChild(newInput)
          
        for (let value in valuesList) {
          let newCell = newRow.insertCell();
          let valueText = valuesList[value].join()
          //console.log(valueText)
          let newText = document.createTextNode(valueText.replace(/,/g, ", "))
          newCell.appendChild(newText)
        }
      } else {
        alert("You must select or enter one or more values before adding to the list.")
      }
    }
  }
};
</script>

<style scoped>
table, th, td {
  border: 1px solid;
  padding-left: 10px;
  padding-right: 10px;
}
input[type=checkbox] {
  padding: 10px;
}
</style>
