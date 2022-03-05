<template>
  <div>
    <div v-if="typeof element == 'undefined'">
      <p>An <em>undefined</em> form field definition for <em>{{ fieldName }}</em> was provided</p>
    </div>
    <div v-else>
    
    <!--Handle special cases-->
    <!--authors__familyName-->
    <div v-if="element['keyName'] == 'authors___authors__familyName'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b> (select an existing value or enter a new one through the control below)</label>
        <input :list="element['keyName']" class="form-control"/>
        <datalist :id="element['keyName']">
          <option
            v-for="(option, index) in element['options']"
            :key="index"
            :value="option['value']"
          ></option>
        </datalist>
      </div>
    </div>
    <!--authors__givenName-->
    <div v-else-if="element['keyName'] == 'authors___authors__givenName'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b> (select an existing value or enter a new one through the control below)</label>
        <input :list="element['keyName']" class="form-control"/>
        <datalist :id="element['keyName']">
          <option
            v-for="(option, index) in element['options']"
            :key="index"
            :value="option['value']"
          ></option>
        </datalist>
      </div>
    </div>
    <!--org__name-->
    <div v-else-if="element['keyName'] == 'authors___author_org__name'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b> (select an existing value or enter a new one through the control below)</label>
        <input :list="element['keyName']" class="form-control"/>
        <datalist :id="element['keyName']">
          <option
            v-for="(option, index) in element['options']"
            :key="index"
            :value="option['value']"
          ></option>
        </datalist>
      </div>
    </div>
    
    <!--Default rendering of fields based on template-->
    <!--Input-Text-->
    <div v-else-if="element['element'] == 'input'">
      <div v-if="element['input_type'] == 'text'">
        <div>
          <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b></label>
          <input  class="form-control"
            :name="element['keyName']"
            :type="element['input_type']"
            :placeholder="'Enter the ' + element['label'] + ' text here' "
          />
        </div>
      </div>
      <!--Input-Checkbox-->
      <!-- need to handle checked state from options -->
      <div v-else-if="element['input_type'] == 'checkbox'">
        <div class="form-control-label"><b>{{ element["label"] }}</b> (select one or more options)</div>
        <div class="form-control">
          <div v-for="(option, index) in element['options']" :key="index" class="checkbox-option">
          <input v-if="option['checked']"
                :name="option['key']"
                :type="element['input_type']"
                checked
              />
            <input v-else :name="option['key']" :type="element['input_type']" />
             {{ option["key"] }}
          </div>
        </div>
      </div>
      <!--Input-Date-->
      <div v-else-if="element['input_type'] == 'date'">
        <div>
          <label :for="element['keyName']" class="form-control-label"><b>{{ element["label"] }}</b></label>
          <input
            :name="element['keyName']"
            :id="element['keyName']"
            :type="element['input_type']"
            class="form-control"
          />
        </div>
      </div>
      <!--Input-Email-->
      <div v-else-if="element['input_type'] == 'email'">
        <div>
          <label :for="element['keyName']" class="form-control-label"><b>{{ element["label"] }}</b></label>
          <input
            :name="element['keyName']"
            :id="element['keyName']"
            :type="element['input_type']"
            class="form-control"
            :placeholder="'Enter the ' + element['label'] + ' here' "
          />
        </div>
      </div>
      <!--Input-Email-->
      <div v-else-if="element['input_type'] == 'url'">
        <div>
          <label :for="element['keyName']" class="form-control-label"><b>{{ element["label"] }}</b></label>
          <input
            :name="element['keyName']"
            :id="element['keyName']"
            :type="element['input_type']"
            class="form-control"
            :placeholder="'Enter the ' + element['label'] + ' here' "
          />
        </div>
      </div>
      <!--Alert for lack of support-->
      <p v-else class="alert">
        The <em>{{ element["input_type"] }}</em> input type for
        <em>{{ element["label"] }}</em> is not yet supported
      </p>
    </div>

    <!--Textarea element-->
    <div v-else-if="element['element'] == 'textarea'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{ element["label"] }}</b></label>
        <textarea 
          :name="element['keyName']" 
          rows="3" 
          class="form-control"
          :placeholder="'Enter the ' + element['label'] + ' text here' " />
      </div>
    </div>

    <!--Select element-->
    <!-- need to add support for multiple attribute -->
    <div v-else-if="element['element'] == 'select'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b> (select one option from the pop-up list below)</label>
        <select :name="element['keyName']" class="form-control">
          <option
            v-for="(option, index) in element['options']"
            :key="index"
            :value="option['value']"
          />
        </select>
      </div>
    </div>

    <!--Datalist element-->
    <div v-else-if="element['element'] == 'datalist'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b> (select an existing value or enter a new one through the control below)</label>
        <input :list="element['keyName']" class="form-control"/>
        <datalist :id="element['keyName']">
          <option
            v-for="(option, index) in element['options']"
            :key="index"
            :value="option['value']"
          ></option>
        </datalist>
      </div>
    </div>

    <!--Flexdatalist element-->
    <div v-else-if="element['element'] == 'flexdatalist'">
      <div>
        <label :for="element['keyName']" class="form-control-label"><b>{{element["label"]}}</b> (select or enter a value and then click "add" to add it to the list)</label>
        <div  class="form-control">
          <div>This is where the selected items will be displayed</div>
          <input :list="element['keyName']"/>
          <datalist :id="element['keyName']">
            <option
              v-for="(option, index) in element['options']"
              :key="index"
              :value="option['value']"
            ></option>
          </datalist>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="alert">
        The <em>{{ element["element"] }}</em> element for <em>{{ element["label"] }}</em> is not yet supported
      </p>
    </div>
    </div>
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
export default {
  props: ["element", "fieldName"], 
  name: "MetaElement",
  //	components: {
  //		Field,
  //		ErrorMessage,
  //	},
  data() {
    return {
      values: [],
    };
  },
};
</script>

<style scoped>
</style>
