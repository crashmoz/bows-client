<template>
	<v-dialog v-model="dialog" max-width="500px" persistent>
		<user-form></user-form>
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
			dialog: "users/modal"
		})
	}
};
</script>
