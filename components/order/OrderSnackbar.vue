<template>
	<v-snackbar
		v-model="dialog"
		class="cart-snackbar"
		:timeout="timeout"
		color="red"
		elevation="24"
		transition="slide-y-reverse-transition"
		@click.native="openCart"
	>
		<div class="mt-n4 d-flex font-weight-bold">
			{{ totalQty }} {{ item }}
			<div class="line"></div>
			{{ totalPrice | formatCurrency("IDR") }}
		</div>
		<template v-slot:action="{ attrs }">
			<v-icon v-bind="attrs" large>mdi-cart</v-icon>
		</template>
	</v-snackbar>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			dialog: false,
			timeout: -1,
			isScrolling: false
		};
	},
	computed: {
		...mapGetters({
			items: "orders/items",
			totalQty: "orders/totalQty",
			totalPrice: "orders/totalPrice"
		}),
		item() {
			if (this.totalQty > 1) {
				return "items";
			} else {
				return "item";
			}
		}
	},
	watch: {
		items(val) {
			if (val.length === 0) {
				this.dialog = false;
			} else {
				this.dialog = true;
			}
		}
	},
	mounted() {
		window.addEventListener(
			"scroll",
			() => {
				if (this.items.length > 0) this.dialog = false;
				window.clearTimeout(this.isScrolling);
				this.isScrolling = setTimeout(() => {
					if (this.items.length > 0) this.dialog = true;
				}, 300);
			},
			false
		);

		this.listenDetailShow();
		this.listenDetailHide();
	},
	methods: {
		listenDetailShow() {
			this.$nuxt.$on("detail-isShow", () => {
				this.dialog = false;
			});
		},
		listenDetailHide() {
			this.$nuxt.$on("detail-isHide", () => {
				if (this.items.length) {
					this.dialog = true;
				}
			});
		},
		openCart() {
			this.$router.push('/cart')
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
.cart-snackbar {
	cursor: pointer;
	font-size: 30px;
	letter-spacing: 0.5px;
	font-weight: 300;
}
.line {
	border: 1px #ffff solid;
	margin: 0 8px;
	font-size: 12px;
}
</style>
