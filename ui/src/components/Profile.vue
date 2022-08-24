<template>
	<div class="container">
		<!-- <header class="jumbotron">
			<h3>
				<strong>{{currentUser.username}}</strong> Profile
			</h3>
		</header> -->
		<p>
			You have been logged in. 
		</p>
	</div>
</template>
	
<script>
	export default {
		name: 'Profile',
		computed: {
			currentUser() {
				return this.$store.state.user;
			}
		},
		mounted() {
			if (!this.currentUser) {
			//this.$router.push('/logintest'); // may be causing infinite loop at this point\
			}
		}
	};
</script>
	