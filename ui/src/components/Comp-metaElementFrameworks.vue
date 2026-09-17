<template>
  <div>
      <div>
        <label :for="ed_framework" class="form-control-label"><b>Learning Framework</b> (select one option from the pop-up list below)</label>
        <select 
          name="ed_frameworks"
          id="ed_frameworks"  
          class="form-control"
          @change="onFrameworkChange($event)"
          v-model="frameworkName">
          <option value="n/a" selected>n/a</option>
          <option
            v-for="(value, key) in element"
            :key="key"
            :value="key"
          >
          {{ key }}
          </option>
        </select>
      </div>
      
      <div v-if="frameworkName != 'n/a' && nodeNames.length > 0">
        <!-- There are node names: {{ nodeNames }} -->
        <label :for="nodes" class="form-control-label"><b>Learning Framework Nodes</b> (select one or more options from the pop-up list below)</label>
        <select 
          name="nodes"
          id="nodes"
          :key="nodeNames" 
          class="form-control" 
          multiple>
          <option
            v-for="(value, index) in nodeNames"
            :key="index"
            :value="value"
          >
          {{ value }}
          </option>
        </select>
      </div>
      
      <div v-else>You must first choose a framework before you can select one or more nodes from that framework</div>

    <button type="button" class="flexiButton" @click="frameworkAdd">Combine entries and add them to the educational framework list</button>
    <div id="frameworks-list" class="flexiList">
      <h3>Frameworks list</h3>
      <p>Uncheck a row in the list to prevent its inclusion in the submission.</p>
      <table id="frameworks_table">
        <tr>
          <th>&nbsp;</th>
          <th>Framework Name</th>
          <th>Nodes</th>
        </tr>
      </table>
      
    </div>
  
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
export default {
  props: ["template"],
  
  name: "MetaElementFrameworks",
  
  components: {
  //  MetaElement
  //		Field,
  //		ErrorMessage,
  },
  
  data() {
    return {
      values: [],
      nodeNames: [],
      frameworkName: "n/a"
    };
  },
  
  computed: {
    element() {
      console.log(this.template)
      return this.template['educational_information___framework_nodes']
    }
  },
  
  methods: {
    onFrameworkChange(event) {
      this.frameworkName = event.target.value
      console.log(this.frameworkName)
      //console.log(this.element['options'][this.frameworkName])
      if (this.frameworkName == "n/a") {
        this.nodeNames = []
      } else {
        this.nodeNames = this.element[this.frameworkName]
      }
      console.log(this.nodeNames)
    },
    frameworkAdd(event) {
      console.log("entering frameworkAdd")
      const listID = "frameworks-list"
      const checkboxName = "frameworks-values"
      let values = {} // the delimited string of individual values
      let valuesList = [] // the array of individual values
      let field_selector = ""
      
      // process selected framework
      let framework_sel = document.getElementById("ed_frameworks")
      let framework_value = [...framework_sel.options]
       .filter(x => x.selected)
       .map(x => x.value);
      
      valuesList.push(framework_value)
      values["name"] = framework_value
      
      
      // process selected nodes for the selected framework
      let nodes_sel = document.getElementById("nodes")
      let nodes_value = [...nodes_sel.options]
       .filter(x => x.selected)
       .map(x => x.value);
      
      valuesList.push(nodes_value)
      values["nodes"] = nodes_value
      
      
//      for (let fieldIndex in this.frameworkFields) {
//        let value = "" // the individual values associated with each field
//        let field = this.frameworkFields[fieldIndex]
//        let submissionField = field.replace('educational_information___ed_frameworks__', '')
//        //console.log(field)
//        field_selector = "#" + field
//        let sel = document.getElementById(field)
//        value = [...sel.options]
//         .filter(x => x.selected)
//         .map(x => x.value);
//        //value = sel.options[sel.selectedIndex].text
//        
//        console.log(value)
//        valuesList.push(value)
//        values[submissionField] = value
//      }
      console.log("values for the newly processed framwork/nodes entry")
      console.log(values)
      var submitValue = {};
      submitValue['name'] = values['name'];
      submitValue['nodes'] = values['nodes'];
      console.log("submit value for the new framework/nodes entry")
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
}
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
