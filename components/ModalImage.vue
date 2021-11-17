<template>
	<v-dialog
		v-model="dialog"
		@outside="dialog = false"
		scrollable
		:overlay="false"
		max-width="500px"
		transition="dialog-transition"
	>
		<v-card>
			<v-img :src="img"></v-img>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	data() {
		return {
			dialog: false,
			img: ""
		};
	},
	mounted() {
		this.$nuxt.$on("show-image", data => {
			this.img = data;
			this.dialog = true;
		});
	},
	beforeDestroy() {
		this.$nuxt.$off("show-image");
	}
};
</script>
