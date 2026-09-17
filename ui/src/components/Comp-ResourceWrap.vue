<template>
	<suspense>
		<template #default>
			<CompResource :id="id" />
		</template>
		<template #fallback>
			<p> Loading ... </p>
		</template>
	</suspense>
</template>


<script>
import CompResource from "./Comp-Resource.vue";

export default {
	name: "ResourceWrap",
	components: {CompResource},
	props: ["id"],
}	
</script>


<style scoped>

</style>
