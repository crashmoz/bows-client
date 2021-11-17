<template>
	<v-dialog
		v-model="dialog"
		@outside="dialog = false"
		scrollable
		:overlay="false"
		max-width="500px"
		transition="slide-y-reverse-transition"
	>
		<v-card class="pa-3 pt-0">
			<v-btn block color="white" text style="height:25px" @click="dialog = !dialog">
				<v-icon color="grey">mdi-chevron-double-down</v-icon>
			</v-btn>
			<div class="pt-4 scroll" style="height:450px">
				<v-card max-width="330px" class="mx-auto" elevation="4">
					<v-img :src="urlImg + product.image"></v-img>
				</v-card>
				<v-card-title class="font-weight-bold subtitle-1 px-2">
					{{ product.name }}
				</v-card-title>
				<v-card-subtitle class="pt-3 px-2">
					{{ product.description }}
				</v-card-subtitle>
			</div>
			<v-divider></v-divider>
			<v-card-title class="font-weight-bold subtitle-1 pa-2">
				Dish Price
				<v-spacer></v-spacer>
				{{ product.price | formatCurrency("IDR") }}
			</v-card-title>
			<v-card-actions>
				<v-btn class="plus" dark block @click="add(product)" rounded>
					Add
					<v-icon right>mdi-plus</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			dialog: false,
			product: {}
		};
	},
	computed: {
		...mapGetters({
			urlImg: "home/urlProduct"
		})
	},
	watch: {
		dialog(val) {
			if (val === true) {
				this.$nuxt.$emit("detail-isShow");
			} else {
				this.$nuxt.$emit("detail-isHide");
			}
		}
	},
	mounted() {
		this.$nuxt.$on("show-detail-product", data => {
			this.product = data;
			this.dialog = true;
		});
	},
	beforeDestroy() {
		this.$nuxt.$off("show-detail-product");
	},
	methods: {
		...mapActions({
			addItem: "orders/addToCart"
		}),
		add(param) {
			this.addItem(param);
			this.dialog = false;
		}
	},
	filters: {
		formatCurrency(value, currency) {
			var formatter = new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: currency,
				minimumFractionDigits: 0
			});
			return formatter.format(value);
		}
	}
};
</script>
<style>
.scroll {
	overflow: auto;
}
.plus {
	background-image: linear-gradient(
		to right,
		#77a1d3 0%,
		#79cbca 51%,
		#77a1d3 100%
	);
}
.plus {
	transition: 0.5s;
	background-size: 200% auto;
	color: white;
	box-shadow: 0 0 20px #eee;
}

.plus:hover {
	background-position: right center; /* change the direction of the change here */
	color: #fff;
	text-decoration: none;
}
</style>
