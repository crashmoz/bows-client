<template>
	<v-card
		class="mx-auto my-16 grey lighten-5"
		max-width="374"
		color="grey-lighten"
	>
		<v-card-title primary-title>
			<h1 class="mx-auto my-8 font-weight-bold">Login</h1>
		</v-card-title>
		<form-login></form-login>
	</v-card>
</template>
<script>
export default {
	layout: "login",
	data() {
		return {};
	}
};
</script>