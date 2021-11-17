<template>
	<div class="text-center">
		<h2 class="mt-10">Choose Your QR Code</h2>
		<v-card class="d-flex justify-center" flat tile>
			<v-card
				v-for="item in data"
				:key="item.name"
				class="pa-2"
				:max-width="$vuetify.breakpoint.smAndDown ? '100' : '130'"
				elevation="0"
			>
				<v-img
					:src="isSelect === item.name ? item.img : item.grey"
					:class="item.name === 'ovo' ? '' : 'mt-1'"
					@click="isSelect = item.name"
				></v-img>
			</v-card>
		</v-card>
		<v-card
			min-width="300"
			max-width="300"
			min-height="300"
			max-height="300"
			v-if="isSelect"
			class="mx-auto pa-2 my-6"
			elevation="6"
		>
			<v-img
				:src="'qr-' + isSelect.toLowerCase() + '.jpg'"
				:lazy-src="'qr-' + isSelect.toLowerCase() + '.jpg'"
				reverse-transition="fade-transition"
				transition="fade-transition"
			></v-img>
		</v-card>
		<div v-if="isSelect" class="ex">
			<pre class="font-weight-bold text-left">
Store Name	 : D'Bows
</pre
			>
			<pre class="font-weight-bold mt-2 text-left">
Total amount : Rp. {{ price }}
</pre
			>
			<v-btn color="primary" class="my-4" @click="done">Done</v-btn>
		</div>
		<v-btn color="primary" fab fixed left bottom to="/payment">
			<v-icon>mdi-chevron-left</v-icon>
		</v-btn>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			isSelect: "",
			data: [
				{
					name: "GOPAY",
					grey: "go-pay-grey.png",
					img: "go-pay.png"
				},
				{
					name: "OVO",
					grey: "ovo-grey.png",
					img: "ovo.png"
				},
				{
					name: "DANA",
					grey: "dana-grey.png",
					img: "dana.png"
				}
			]
		};
	},
	computed: {
		...mapGetters({
			totalPrice: "orders/totalPrice"
		}),
		price() {
			if (this.totalPrice) {
				return this.totalPrice.toLocaleString("id-ID");
			} else {
				return 0;
			}
		}
	},
	created() {
		this.socket = this.$nuxtSocket({});
	},
	methods: {
		...mapActions({
			order: "orders/order"
		}),
		...mapMutations({
			addWallet: "orders/ADD_WALLET"
		}),
		async done() {
			await this.addWallet(this.isSelect);
			this.order()
				.then(() => {
					this.socket.emit("order added");
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
};
</script>
<style>
.ex {
	-moz-tab-size: 4; /* Firefox */
	tab-size: 4;
	width: 270px;
	margin: auto;
}
</style>
