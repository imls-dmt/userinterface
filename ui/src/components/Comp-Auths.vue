<template>
<div>
	<!-- <p>Content from auths component</p> -->
	<!-- <p>{{ local_groups }}</p> -->
	<!-- <p>{{ local_auths }}</p> -->
	<div class="row">
		<span v-if="resourceID && (local_auths.update || local_auths.submit_publish || local_auths.publish || local_auths.del)" class="col"> 
			<router-link :to="`/Contribute/${resourceID}`"> 
			<button
			type="button" 
			class="flexiButton submit_button">
			Edit Resource</button>
			</router-link>&nbsp;
			Workflow:
	<select id="workflowSelect" :value="currentOption" @change="workflow($event)">
		<option
			v-if="local_auths.update && localStatus == 'in-process'"
				id="wf_inprocess"
				value="wf_inprocess">
					In process</option>
		<option
				v-else-if="local_auths.update"
				id="wf_inprocess"
				value="wf_inprocess">Set to "in process"</option>

			<option
						v-if="local_auths.update && localStatus == 'in-review'"
						id="wf_revert_to_inprocess"
						value="wf_revert_to_inprocess">
							In review</option>
				<option
						v-else-if="local_auths.update"
						id="wf_inreview"
						value="wf_inreview">Submit for review</option>
				
				<option
							v-if="local_auths.submit_publish && localStatus == 'pre-pub-review'"
							id="wf_revert_to_inreview"
							value="wf_revert_to_inreview">In pre-publication review</option>
						<option
							v-else-if="local_auths.submit_publish"
							id="wf_prepub"
							value="wf_prepub">Submit for pre-publication review</option>
						
						<option
								v-if="local_auths.publish && localStatus == 'published'"
								id="wf_pub_nochange"
								value="wf_pub_nochange">Published</option>
							<option
								v-else-if="local_auths.publish"
								id="wf_pub"
								value="wf_pub">Publish</option>
							
							<option
										v-if="local_auths.submit_publish && localStatus == 'deprecate-request'"
										id="wf_revert_to_inreview"
										value="wf_revert_to_inreview">In pre-deprecation review</option>
									<option
										v-else-if="local_auths.update"
										id="wf_predel"
										value="wf_predel">Submit for pre-deprecation review</option> 
								
								<option
											v-if="local_auths.del && localStatus == 'deprecated'"
											id="wf_revert_to_predel"
											value="wf_revert_to_predel">Resource deprecated</option>
										<option
											v-else-if="local_auths.del"
											id="wf_del"
											value="wf_del">
											Deprecate resource</option>
				


	</select>
		</span>

	</div>

</div>	
</template>

<script>
import { inject } from "vue";
import axios from "axios";

export default {
	name: "CompAuths",
	emits: ["status-changed"],
	props: ["resourceID", 
					"local_groups", 
					"local_auths", 
					"id",
					"status"],
	data() {
						return {
							apiBase: inject("$appApiBase"),
							resource: {},
							componentKey: 0,
							// Initialised from the prop; previously read the global window.status,
							// so the dropdown never reflected the record's real state.
							localStatus: this.status
						};
					},
					watch: {
						status(newValue) {
							this.localStatus = newValue;
						},
					},
					computed: {
						// Option value that represents the record's current state (the
						// "In process" / "In review" / ... entries), so the select shows it.
						currentOption() {
							return {
								"in-process": "wf_inprocess",
								"in-review": "wf_revert_to_inprocess",
								"pre-pub-review": "wf_revert_to_inreview",
								"published": "wf_pub_nochange",
								"deprecate-request": "wf_revert_to_inreview",
								"deprecated": "wf_revert_to_predel",
							}[this.localStatus] || "";
						},
					},
					methods: {
						workflow(event) {
							const selectedState = event.target.value;
							const transitions = {
								wf_inprocess: ["in-process", 0],
								wf_inreview: ["in-review", 0],
								wf_prepub: ["pre-pub-review", 0],
								wf_pub: ["published", 1],
								wf_predel: ["deprecate-request", 0],
								wf_del: ["deprecated", 0],
							};
							if (!(selectedState in transitions) || selectedState === this.currentOption) {
								// Re-selecting the current state (or a label-only entry) is not a transition.
								event.target.value = this.currentOption;
								return;
							}
							const [newPubStatus, newStatus] = transitions[selectedState];
							let submission = {
								"id":this.resourceID,
								"pub_status":newPubStatus,
								"status":newStatus
							}
							console.log(submission)
					
							let submitMethod = "PUT"
					
							// submit the generated metadata to create/update resource
							let apibase = this.apiBase;
							let url = apibase.concat("/api/resource/");
							console.log(url);
							axios({
								url: url,
								method: submitMethod,
								data: submission,
								withCredentials: true,
							}).then((response) => {
								if (response.data) {
									console.log(response.data);
								}
								console.log(response.data);
								if (response.data["status"] == "success") {
									//let resultResourceID = response.data["doc"]["id"];
									this.resource = response.data["doc"]
									//console.log(resultResourceID);
									console.log(this.resource)
									alert("Congratulations, your workflow status update for record resource ID: " +
											this.resource["id"] + " to " + newPubStatus + " was successful.")
									this.localStatus = this.resource['pub_status'];
									this.$emit("status-changed", this.localStatus);
								} else {
									const detail = response.data && (response.data.error || response.data.message);
									alert("Your submission failed with an error of: " + (detail || JSON.stringify(response.data)));
								}
							}).catch((err) => {
								alert("Your submission failed: " + (err.message || err));
							});
						}
					}
};

</script>

<style scoped>
.row {
	display: flex;
}
.col {
	flex: 1;
	padding: 10px;
}
.col span {
	display: block;
	font-size: .75em;
	text-align: center;
	line-height: 80%;
}
.col img {
	max-width: 40px;
	height: 40px;
	margin: auto;
	display: block;
}
</style>