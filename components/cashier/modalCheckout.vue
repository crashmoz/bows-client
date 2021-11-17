<template>
	<v-dialog
		v-model="dialog"
		@outside="dialog = false"
		scrollable
		:overlay="false"
		transition="dialog-bottom-transition"
	>
		<v-card>
      Isi payment
    </v-card>
	</v-dialog>
</template>
<script>
export default {
	data() {
		return {
			dialog: false
		};
	},
	computed: {},
	mounted() {
		this.$nuxt.$on("show-modal-checkout", () => {
			this.dialog = true;
		});
	},
	beforeDestroy() {
		this.$nuxt.$off("show-modal-checkout");
	}
};
</script>
