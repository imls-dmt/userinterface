<template>
<div>
	<!-- <p>Content from auths component</p> -->
	<!-- <p>{{ local_groups }}</p> -->
	<!-- <p>{{ local_auths }}</p> -->
	<div class="row">
		<span v-if="resourceID && (local_auths.update || local_auths.submit_publish || local_auths.publish || local_auths.del)" class="col"> 
			<router-link :to="`/Contribute/${resourceID}`"> edit resource </router-link>&nbsp;
			Workflow:
	<select id="workflowSelect" @change="workflow($event)">
		<option
			v-if="local_auths.update && status == 'in-process'"
				id="wf_inprocess"
				value="wf_inprocess"
				selected>
					In process</option>
		<option
				v-else-if="local_auths.update"
				id="wf_inprocess"
				value="wf_inprocess">Set to "in process"</option>

			<option
						v-if="local_auths.update && status == 'in-review'"
						id="wf_revert_to_inprocess"
						value="wf_revert_to_inprocess"
						selected>
							In review</option>
				<option
						v-else-if="local_auths.update"
						id="wf_inreview"
						value="wf_inreview">Submit for review</option>
				
				<option
							v-if="local_auths.submit_publish && status == 'pre-pub-review'"
							id="wf_revert_to_inreview"
							value="wf_revert_to_inreview"
							selected>In pre-publication review</option>
						<option
							v-else-if="local_auths.submit_publish"
							id="wf_prepub"
							value="wf_prepub">Submit for pre-publication review</option>
						
						<option
								v-if="local_auths.publish && status == 'published'"
								id="wf_pub_nochange"
								value="wf_pub_nochange"
								selected>Published</option>
							<option
								v-else-if="local_auths.publish"
								id="wf_pub"
								value="wf_pub">Publish</option>
							
							<option
										v-if="local_auths.submit_publish && status == 'deprecate-request'"
										id="wf_revert_to_inreview"
										value="wf_revert_to_inreview"
										selected>In pre-deprecation review</option>
									<option
										v-else-if="local_auths.update"
										id="wf_predel"
										value="wf_predel">Submit for pre-deprecation review</option> 
								
								<option
											v-if="local_auths.del && status == 'deprecated'"
											id="wf_revert_to_predel"
											value="wf_revert_to_predel"
											selected>Resource deprecated</option>
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
	name: "auths",
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
							localStatus: status
						};
					},
					methods: {
						workflow(event) {
							let selectedState = event.target.value
							let newPubStatus = ""
							let newStatus = ""
							if (selectedState == "wf_inprocess") {
								newPubStatus = "in-process"
								newStatus = 0
							} else if (selectedState == "wf_inreview") {
								newPubStatus = "in-review"
								newStatus = 0
							} else if (selectedState == "wf_prepub") {
									newPubStatus = "pre-pub-review"
									newStatus = 0
							} else if (selectedState == "wf_pub") {
									newPubStatus = "published"
									newStatus = 1
							//} else if (selectedState == "wf_pub_nochange") {
							//		newPubStatus = "pre-pub-review"
							//		newStatus = 0
							} else if (selectedState == "wf_predel") {
									newPubStatus = "deprecate-request"
									newStatus = 0
							} else if (selectedState == "wf_del") {
									newPubStatus = "deprecated"
									newStatus = 0
							}
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
									//this.loadResource(this.resource)
									this.localStatus = this.resource['pub_status'];
								} else {
									console.log(response.data);
									alert(
										"Your submission failed with an error of: ",
										response.data
									);
								}
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