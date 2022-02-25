<template>
  <div>
    <!--Input-Text-->
    <div v-if="element['element'] == 'input'">
      <div v-if="element['input_type'] == 'text'">
        <div class="form-group">
          <label :for="element['keyName']" class="field-label">{{
            element["label"]
          }}</label>
          <input
            :name="element['keyName']"
            :type="element['input_type']"
            class="form-control"
          />
        </div>
      </div>
      <!--Input-Checkbox-->
      <!-- need to handle checked state from options -->
      <div v-else-if="element['input_type'] == 'checkbox'">
        <div class="form-control-label">{{ element["label"] }}</div>
        <table>
          <tr
            v-for="(option, index) in element['options']"
            :key="index"
            class="form-table"
          >
            <td v-if="option['checked']">
              <input
                :name="option['key']"
                :type="element['input_type']"
                checked
              />
            </td>
            <td v-else>
              <input :name="option['key']" :type="element['input_type']" />
            </td>
            <td>
              <label :for="option['key']">{{ option["key"] }}</label>
            </td>
          </tr>
        </table>
      </div>
      <!--Input-Date-->
      <div v-else-if="element['input_type'] == 'date'">
        <div class="form-group">
          <label :for="element['keyName']" class="field-label">{{
            element["label"]
          }}</label>
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
        <div class="form-group">
          <label :for="element['keyName']" class="field-label">{{
            element["label"]
          }}</label>
          <input
            :name="element['keyName']"
            :id="element['keyName']"
            :type="element['input_type']"
            class="form-control"
          />
        </div>
      </div>
      <!--Input-Email-->
      <div v-else-if="element['input_type'] == 'url'">
        <div class="form-group">
          <label :for="element['keyName']" class="field-label">{{
            element["label"]
          }}</label>
          <input
            :name="element['keyName']"
            :id="element['keyName']"
            :type="element['input_type']"
            class="form-control"
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
      <div class="form-group">
        <label :for="element['keyName']" class="field-label">{{
          element["label"]
        }}</label>
        <textarea :name="element['keyName']" rows="3" class="form-control" />
      </div>
    </div>

    <!--Select element-->
    <!-- need to add support for multiple attribute -->
    <div v-else-if="element['element'] == 'select'">
      <div class="form-group">
        <label :for="element['keyName']" class="field-label">{{
          element["label"]
        }}</label>
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
      <div class="form-group">
        <label :for="element['keyName']" class="field-label">{{
          element["label"]
        }}</label>
        <input :list="element['keyName']" />
        <datalist :id="element['keyName']" class="form-control">
          <option
            v-for="(option, index) in element['options']"
            :key="index"
            :value="option['value']"
          ></option>
        </datalist>
      </div>
    </div>

    <span v-else>
      <p class="alert">
        The <em>{{ element["element"] }}</em> element for
        <em>{{ element["label"] }}</em> is not yet supported
      </p>
    </span>

    <p class="diagnostic">
      Key: {{ element["keyName"] }}, Name: {{ element["name"] }}, Label:
      {{ element["label"] }}, Facet: {{ element["facet"] }}, Element:
      {{ element["element"] }}, Input Type: {{ element["input_type"] }},
    </p>
  </div>
</template>

<script>
//import { Field, ErrorMessage } from "vee-validate";
export default {
  props: ["element"],
  name: "MetaElement",
  //	components: {
  //		Field,
  //		ErrorMessage,
  //	},
  data() {
    return {
      test: "",
    };
  },
};
</script>

<style>
.diagnostic {
  font-size: 8pt;
  color: gray;
  padding: 0px;
  margin: 0px;
}
.alert {
  color: red;
}
.field-label {
  display: inline;
}
.checkbox-box {
  display: inline;
  margin-right: 6pt;
}
.form-table {
  vertical-align: top;
}
</style>
