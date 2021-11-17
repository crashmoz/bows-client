<template>
	<v-container grid-list-xs class="text-center">
		<v-card
			class="mx-auto my-12"
			width="400px"
			max-height="400px"
			rounded
			elevation="5"
		>
			<v-img lazy-src="/Logo-wide.png" src="/Logo-wide.png"></v-img>
		</v-card>

		<v-card
			class="d-flex justify-space-around mb-6 mx-auto"
			flat
			tile
			width="400"
		>
			<v-card width="150">
				<v-btn
					color="error"
					class="btn"
					large
					block
					@click="selectType('TAKE AWAY')"
				>
					Take away
				</v-btn>
			</v-card>
			<v-card width="150">
				<v-btn
					color="error"
					class="btn"
					large
					block
					@click="selectType('DINE IN')"
				>
					Dine in
				</v-btn>
			</v-card>
		</v-card>
	</v-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			items: state => state.orders.items
		})
	},
	methods: {
		...mapMutations({
			add: "orders/ADD_ORDER_TYPE"
		}),
		selectType(param) {
			this.add(param);
			$nuxt.$router.push("/menu");
		}
	}
};
</script>
<style>
.btn {
	transition: transform 0.2s;
}
.btn:hover {
	transform: scale(1.2);
}
</style>
