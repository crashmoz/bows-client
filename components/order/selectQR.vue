<template>
	<v-container class="text-center my-12" transition="scale-transition">
		<h2 class="py-12">Select Your QR</h2>
		<v-container class="justify-center mx-auto d-flex">
			<!-- <v-hover v-slot="{ hover }">
			<v-card
				class="blue lighten-2 custom text-center left"
				:elevation="hover ? 12 : 6"
				width="150"
				height="200"
				:class="{ 'on-hover': hover }"
			>
				<v-img src="/payment-method.png" width="120" height="120" class="mx-auto my-4"></v-img>
				<v-card-text>
					<h2 class="font-weight-bold white--text">Cash</h2>
				</v-card-text>
			</v-card>
			</v-hover>
			<v-hover v-slot="{ hover }">
			<v-card
				class=" blue lighten-2 custom right"
				:elevation="hover ? 12: 6"
				@click="$nuxt.$emit('selectQr')"
				width="150"
				height="200"
				:class="{ 'on-hover': hover }"
			>
				<v-img src="/qr-code.png" height="120" class="my-4"></v-img>
				<v-card-text class="mt-n2">
					<h2 class="font-weight-bold white--text">QR Code</h2>
				</v-card-text>
			</v-card>
			</v-hover> -->

			<v-img src="/dana.jpg"></v-img>
		</v-container>
	</v-container>
</template>
<script>
export default {
	data() {
		return {};
	}
};
</script>
<style>
.custom {
	transition: 0.2s;
	position: absolute;
}
.custom:hover {
  cursor: pointer;
	margin-top: -15px;
}
.left {
	margin-right: 200px;
}
.right {
	margin-left: 200px;
}
</style>
