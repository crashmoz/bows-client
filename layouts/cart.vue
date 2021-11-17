<template>
	<v-app>
		<v-main>
			<nuxt />
		</v-main>
		<v-footer fixed app class="pa-0">
			<v-card class="bg">
				<v-card-text class="py-2">
					<v-layout wrap>
						<v-flex pa-1 xs6 class="font-weight-black white--text">
							Total Price <br />
							<span v-if="totalPrice" class="title">
								IDR. {{ totalPrice.toLocaleString("id-ID") }}
							</span>
							<span v-else class="title">IDR. 0</span>
						</v-flex>
						<v-flex pa-1 xs6 text-right>
							<v-btn
								color="error"
								:disabled="totalQty == 0"
								rounded
								class="my-2"
								elevation="4"
								@click="postOrder"
							>
								<v-icon left>mdi-cart-arrow-right</v-icon>
								Checkout
							</v-btn>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-footer>
	</v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			fixed: false
		};
	},
	computed: {
		...mapGetters({
			totalPrice: "orders/totalPrice",
			totalQty: "orders/totalQty"
		})
	},
	methods: {
		...mapActions({
			order: 'orders/order'
		}),
		async postOrder() {
			try {
				// await this.order()
				// await this.$router.push('/')
				await this.$router.push('/payment')
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
<style>
.bg {
	width: 100vw;
	background-color: #9599e2;
	background-image: linear-gradient(
		135deg,
		#9599e2 0%,
		#8bc6ec 50%,
		#a5b6da 100%
	);
}
</style>
