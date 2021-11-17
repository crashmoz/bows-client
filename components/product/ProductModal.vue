<template>
	<v-dialog v-model="dialog" max-width="500px" persistent>
		<product-form></product-form>
	</v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			dialog: "products/modal"
		})
	}
};
</script>
