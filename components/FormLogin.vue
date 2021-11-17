<template>
	<v-form ref="form" class="mx-4 pb-8" v-model="valid">
		<v-text-field
			v-model="username"
			prepend-icon="mdi-account"
			label="Username"
			:rules="[() => !!username || 'This field is required']"
			v-on:keyup.enter="validate"
		></v-text-field>
		<v-text-field
			v-model="password"
			prepend-icon="mdi-lock"
			label="Password"
			type="password"
			:rules="[() => !!password || 'This field is required']"
			v-on:keyup.enter="validate"
		></v-text-field>
		<v-btn large block class="bground my-2" rounded dark @click="validate">
			Login
		</v-btn>
	</v-form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			valid: true,
			username: "",
			password: ""
		};
	},
	methods: {
		...mapActions({
			auth: "auth/login",
			getUser: "auth/getUser"
		}),
		validate() {
			if (this.$refs.form.validate()) {
				this.login();
			}
		},
		async login() {
			let data = {
				username: this.username,
				password: this.password
			};
			try {
				await this.auth(data);
				await this.getUser();
				this.$swal({
					icon: "success",
					title: "Login successful"
				});
				$nuxt.$router.push("/admin");
			} catch (error) {
				this.$swal({
					icon: "error",
					title: "Login failed",
					text: "Please check your username or password"
				});
			}
		},
		getU() {
			this.getUser();
		}
	}
};
</script>
<style>
.bground {
	background: rgb(72, 198, 239);
	background: linear-gradient(
		0deg,
		rgba(72, 198, 239, 1) 0%,
		rgba(111, 134, 214, 1) 100%
	);
}
</style>
