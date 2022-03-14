<template>
	<suspense>
		<template #default>
			<Resource :id="id" />
		</template>
		<template #fallback>
			<p> Loading ... </p>
		</template>
	</suspense>
</template>


<script>
import Resource from "./Resource.vue";

export default {
	name: "ResourceWrap",
	components: {Resource},
	props: ["id"],
}	
</script>


<style scoped>

</style>
