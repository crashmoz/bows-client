<template>
	<v-container class="text-center my-12" transition="scale-transition">
		<h2 class="py-12">Select Payment Method</h2>
		<v-container class="justify-center mx-auto d-flex">
			<v-hover v-slot="{ hover }">
				<v-card
					class="blue lighten-2 custom text-center"
					:elevation="hover ? 12 : 6"
					width="150"
					height="200"
					:class="[
						$vuetify.breakpoint.xs ? 'mobile-left' : 'left',
						{ 'on-hover': hover }
					]"
					@click="select('CASH')"
				>
					<v-img
						src="/payment-method.png"
						width="120"
						height="120"
						class="mx-auto my-4"
					></v-img>
					<v-card-text>
						<h2 class="font-weight-bold white--text">Cash</h2>
					</v-card-text>
				</v-card>
			</v-hover>
			<v-hover v-slot="{ hover }">
				<v-card
					class="blue lighten-2 custom "
					:elevation="hover ? 12 : 6"
					width="150"
					height="200"
					:class="[
						$vuetify.breakpoint.xs ? 'mobile-right' : 'right',
						{ 'on-hover': hover }
					]"
					@click="select('QR CODE')"
				>
					<v-img src="/qr-code.png" height="120" class="my-4"></v-img>
					<v-card-text class="mt-n2">
						<h2 class="font-weight-bold white--text">QR Code</h2>
					</v-card-text>
				</v-card>
			</v-hover>
		</v-container>
		<v-btn fab color="primary" fixed left bottom to="/cart">
			<v-icon class="mdi-36px">mdi-chevron-left</v-icon>
		</v-btn>
	</v-container>
</template>
<script>
import { mapMutations, mapActions } from "vuex";

export default {
	data() {
		return {};
	},
	methods: {
		...mapMutations({
			add: "orders/ADD_PAYMENT_TYPE"
		}),
		...mapActions({
			order: "orders/order"
		}),
		select(val) {
			if (val === "QR CODE") {
				this.add(val);
				$nuxt.$router.push("/selectQR");
			} else {
				this.add(val);
				this.order()
					.then(() => {
						this.$swal({
							title: "Thanks for your order",
							icon: "success"
						}).then(result => {
							if (result.isConfirmed) {
								$nuxt.$router.push("/");
							}
						});
					})
					.catch(err => {
						this.$swal({
							icon: "error",
							title: "Oops...",
							text: "Something went wrong! Please try again"
						});
					});
			}
		}
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
.mobile-left {
	margin-right: 160px;
}
.mobile-right {
	margin-left: 160px;
}
</style>
