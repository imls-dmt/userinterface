<template>
<div>
	<!-- <p>Content from auths component</p> -->
	<!-- <p>{{ local_groups }}</p> -->
	<!-- <p>{{ local_auths }}</p> -->
	<div class="row">
		<!-- <div v-if="local_auths.create_short && !resourceID"
					class="col">
		<img
			src="@/assets/create_resource_shortform.png"
			alt="Create new resource - short metadata form"
			title="Create new resource - short metadata form"
		/>
		<span>Create - short form</span>
		</div>
		<div v-if="local_auths.create && !resourceID"
					class="col">
		<img
			src="@/assets/noun-create-document-1868022.png"
			alt="Create new resource - full metadata form"
			title="Create new resource - full metadata form"
		/>
		<span>Create - full form</span>
		</div> -->
		<div v-if="local_auths.update && resourceID"
					class="col">
		<router-link :to="`/Contribute/${resourceID}`">
			<img
				src="@/assets/document_edit.png"
				alt="Edit resource metadata"
				title="Edit resource metadata"
			/>
			<span>Edit resource</span>
		</router-link>
		</div>
		<div v-if="local_auths.update && resourceID"
					class="col">
		<img
			src="@/assets/pre-publish_review.png"
			alt="Submit for pre-publication review"
			title="Submit for pre-publication review"
		/>
		<span>Pre-publish review</span>
		</div>
		<div v-if="local_auths.update && resourceID"
					class="col">
		<img
			src="@/assets/pre-deprecation_review.png"
			alt="Submit for pre-deprecation review"
			title="Submit for pre-deprecation review"
		/>
		<span>Pre-deprecation review</span>
		</div>
		<div v-if="local_auths.publish && resourceID"
					class="col">
		<img
			src="@/assets/noun-share-symbol-1868078.png"
			alt="Publish a resource"
			title="Publish a resource"
		/>
		<span>Publish resource</span>
		</div>
		<div v-if="local_auths.publish && resourceID"
					class="col">
		<img
			src="@/assets/unpublish.png"
			alt="Unpublish a resource"
			title="Unpublish a resource"
		/>
		<span>Unpublish resource</span>
		</div>
		<div v-if="local_auths.del && resourceID"
					class="col">
		<img
			src="@/assets/noun-dustbin-1868018.png"
			alt="Deprecate a resource"
			title="Deprecate a resource"
		/>
		<span>Deprecate resource</span>
		</div>
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