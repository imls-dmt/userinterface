<template>
	<div>
		<ul>
			<li> Key: {{ element['keyName'] }} </li>
			
			<li> Name: {{ element['name'] }} </li>
			<li> Label: {{ element['label'] }} </li>
			<li> Facet: {{ element['facet'] }} </li>
			<li> Element: {{ element['element'] }} </li>
			<li> Input Type: {{ element['input_type'] }} </li>
		</ul>	
		<div v-if="element['element'] == 'input'">
			<div v-if="element['input_type'] == 'text'">
				<div class="form-group">
					<label :for="key">{{ element['label'] }}</label>
					<input :name="key" :type="element['type']" class="form-control" />
				</div>
			</div>	
			<p v-else>The <em>{{ element['input_type'] }}</em> input type for <em>{{ element['label'] }}</em> is not yet 	supported</p>		
		</div>
		<p v-else>The <em>{{ element['element'] }}</em> element for <em>{{ element['label'] }}</em> is not yet 	supported</p>
	</div>
</template>


<script>
//import { Field, ErrorMessage } from "vee-validate";
export default {
	props: ["key", "element"],
    name: "MetaElement",
//	components: { 
//		Field,
//		ErrorMessage,
//	},
    data() {
		return {
			test: ""
		};
	},	
}	
</script>


<style>
	
	
</style>