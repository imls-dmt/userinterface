<template>
<div>
	<!-- <p>Content from auths component</p> -->
	<!-- <p>{{ local_groups }}</p> -->
	<!-- <p>{{ local_auths }}</p> -->
	<div class="row">
		<span v-if="resourceID && (local_auths.update || local_auths.publish || local_auths.del)" class="col"> Workflow:
	<select id="workflowSelect" @change="workflow($event)">
		<option
			v-if="local_auths.update && localStatus == 'in-process'"
				id="wf_inprocess"
				value="wf_inprocess"
				selected>
					In process</option>
		<option
				v-else-if="local_auths.update"
				id="wf_inprocess"
				value="wf_inprocess">Set to "in process"</option>

			<option
						v-if="local_auths.update && localStatus == 'in-review'"
						id="wf_revert_to_inprocess"
						value="wf_revert_to_inprocess"
						selected>
							In review - revert "in process"</option>
				<option
						v-else-if="local_auths.update"
						id="wf_inreview"
						value="wf_inreview">Submit for review</option>
				
				<option
							v-if="local_auths.update && localStatus == 'pre-pub-review'"
							id="wf_revert_to_inreview"
							value="wf_revert_to_inreview"
							selected>In pre-publication review - revert to "in review"</option>
						<option
							v-else-if="local_auths.update"
							id="wf_prepub"
							value="wf_prepub">Submit for pre-publication review</option>
						
						<option
								v-if="local_auths.publish && localStatus == 'published'"
								id="wf_pub_nochange"
								value="wf_pub_nochange"
								selected>Published</option>
							<option
								v-else-if="local_auths.publish"
								id="wf_pub"
								value="wf_pub">Publish</option>
							
							<option
										v-if="local_auths.update && localStatus == 'deprecate-request'"
										id="wf_revert_to_inreview"
										value="wf_revert_to_inreview"
										selected>In pre-deprecation review</option>
									<option
										v-else-if="local_auths.update"
										id="wf_predel"
										value="wf_predel">Submit for pre-deprecation review</option> 
								
								<option
											v-if="local_auths.del && localStatus == 'deprecated'"
											id="wf_revert_to_predel"
											value="wf_revert_to_predel"
											selected>Resource deprecated"</option>
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

export default {
	name: "auths",
	props: ["resourceID", 
					"local_groups", 
					"local_auths", 
					"id"]
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