<template>
<div class="col-md-12">
	<span v-if="loggedin">
		<p>You are logged in as: {{ username }}</p>
		<p>You are a member of the following DMTC groups:</p>
		<ul>
			<li v-for="(group,index) in groups" :key="index">{{ group }} </li>
		</ul>
		<Form @submit="handleLogout">
			<div class="form-group">
				<button class="btn btn-primary btn-block">
				<span>Logout</span>
				</button>
			</div>
		</Form>
	</span>
	<span v-else>
		<div class="card card-container">
			<Form @submit="handleLogin" :validation-schema="schema">
				<div class="form-group">
					<label for="username">Username</label>
					<Field name="username" type="text" class="form-control" />
					<ErrorMessage name="username" class="error-feedback" />
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<Field name="password" type="password" class="form-control" />
					<ErrorMessage name="password" class="error-feedback" />
				</div>	
				<div class="form-group">
					<button class="btn btn-primary btn-block" :disabled="loading">
					<span
						v-show="loading"
						class="spinner-border spinner-border-sm"
					></span>
					<span>Login</span>
					</button>
				</div>
				<div class="form-group">
					<div v-if="message" class="alert alert-danger" role="alert">
						{{ message }}
					</div>
				</div>
			</Form>
		</div>
	</span>
</div>
</template>
	
<script>
	import { Form, Field, ErrorMessage } from "vee-validate";
	import * as yup from "yup";
	import { mapGetters } from 'vuex';

	export default {
		name: "Login",
		
		components: {
			Form,
			Field,
			ErrorMessage,
		},
		
		data() {
			const schema = yup.object().shape({
				username: yup.string().required("Username is required!"),
				password: yup.string().required("Password is required!"),
			});
	
			return {
				loading: false,
				message: "",
				schema,
			};
		},

		computed: {
			...mapGetters([
				'loggedin',
				'username',
				'groups'
			])
		},
		
		methods: {
			handleLogin(user) {
				this.loading = true;
				console.log("username: " + user.username)
				//console.log(user);
				this.$store.dispatch("login", user).then(
					() => {
						//console.log(response)
						this.loading = false;
						//this.$router.push("/profile");
					},
					(error) => {
						this.loading = false;
						this.message =
							(error.response &&
							error.response.data &&
							error.response.data.message) ||
							error.message ||
							error.toString();
					}
				);
				this.$store.dispatch("getGroups").then(
					() => {
						console.log("getting the user's groups")
					}
				);
					
			},
			handleLogout() {
				this.$store.dispatch("logout");
				
			}
		},
	};
</script>
	
<style scoped>
</style>
	