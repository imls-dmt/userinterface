<template>
  <div>
    <div v-for="field in contributorOrgFields" :key="field">
      <MetaElement 
        :element='template[field]'
        :fieldName='field' />
    </div>
    <button type="button" class="flexiButton" @click="contributorOrgAdd">Combine entries and add them to the contributing organizations list</button>
    <div id="contributorOrgs-list" class="flexiList">
      <h3>Contributing organizations list</h3>
      <p>Uncheck a row in the list to prevent its inclusion in the submission.</p>
      <table id="contributorOrgs_table">
        <tr>
          <th>&nbsp;</th>
          <th v-for="field in contributorOrgFields" :key="field">{{ template[field]['label'] }}</th>
        </tr>
      </table>
      
    </div>
  
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
import MetaElement from "./Comp-metaElement.vue";
export default {
  props: ["template", "contributorOrgFields"],
  
  name: "MetaElementContributorOrgs",
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
    contributorOrgAdd(event) {
      const listID = "contributorOrgs-list"
      const checkboxName = "contributorOrgs-values"
      let values = {} // the delimited string of individual values
      let valuesList = [] // the array of individual values
      let field_selector = ""
      for (let fieldIndex in this.contributorOrgFields) {
        let value = "" // the individual values associated with each field
        let field = this.contributorOrgFields[fieldIndex]
        //console.log(field)
        field_selector = "#" + field
        //console.log(this.authorFields[fieldIndex])
        //console.log(this.template[field]['element'])
        if (this.template[field]['element'] == 'input') {
          //console.log("Input element")
          value = document.getElementById(field).value
        } else if (this.template[field]['element'] == 'flexdatalist') {
          // as author name flexdatalists should be treated as data lists we are doing so here
          //console.log("Flexdatalist element")
          let datalist_selector = "#" + field + '-datalist'
          //console.log(datalist_selector)
          //value = document.getElementById(datalist_selector)
          value = document.querySelector(datalist_selector).value
        } else if (this.template[field]['element'] == 'datalist') {
          //console.log("Datalist element")
          let datalist_selector = "#" + field + '-datalist'
          //console.log(datalist_selector)
          //value = document.getElementById(datalist_selector)
          value = document.querySelector(datalist_selector).value
        } else if (this.template[field]['element'] == 'select') {
          //console.log("Select element")
          let sel = document.getElementById(field)
          value = sel.options[sel.selectedIndex].text
        } else {
          //console.log("An unhandled field element type of " + this.template[this.authorFields[fieldIndex]['element']] + " has been encountered")
        }
        
        console.log(value)
        valuesList.push(value)
        values[field] = value
      }
      console.log(values)
      const checkboxID = listID + "-" + self.crypto.randomUUID()
      if (values !== "n/a") {
        let myTable = document.getElementById('contributorOrgs_table')
        let newRow = myTable.insertRow()
        let newCell = newRow.insertCell();
        let newInput = document.createElement('input')
        let newLabel = document.createElement('label')
        newInput.setAttribute('type', 'checkbox')
        newInput.setAttribute('id', checkboxID)
        newInput.setAttribute('value', JSON.stringify(values))
        newInput.setAttribute('checked', "")
        newCell.appendChild(newInput)
          
        for (let value in valuesList) {
          let newCell = newRow.insertCell();
          let newText = document.createTextNode(valuesList[value])
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
