<template>
	<div>
		<v-btn fab top left icon dark small to="/admin/orders">
			<v-icon color="black" large>
				mdi-chevron-left
			</v-icon>
		</v-btn>
		Details {{ data._id }}
		<v-card class="py-2 px-4" min-height="80vh">
			<v-card-text>
				Transaction ID
			</v-card-text>
			<v-card-title class="mb-n4 mt-n7" id="sp">
				{{ data._id }}
			</v-card-title>
			<v-card-text class="font-weight-bold">
				Transaction Status: {{ data.status }}
			</v-card-text>
			<v-container class="mt-n4">
				<v-row>
					<v-col cols="10" md="4">
						<table>
							<thead>
								<tr>
									<th colspan="3" align="left">Payment</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td>Status</td>
									<td width="10">:</td>
									<td>{{ data.payment_status }}</td>
								</tr>
								<tr>
									<td>Type</td>
									<td>:</td>
									<td>{{ data.payment_type }}</td>
								</tr>
								<tr v-if="data.wallet">
									<td>Wallet</td>
									<td>:</td>
									<td>{{ data.wallet }}</td>
								</tr>
								<tr>
									<td>Sub Total</td>
									<td>:</td>
									<td>
										{{
											data.total_amount
												| formatCurrency("IDR")
										}}
									</td>
								</tr>
							</tbody>
						</table>
					</v-col>
					<v-col
						cols="12"
						md="6"
						offset-md="2"
						sm="10"
						class="md ? mt-n6 : ''"
					>
						<table>
							<thead>
								<tr>
									<th colspan="4" align="left">
										Detail Order
									</th>
								</tr>
							</thead>
							<tr
								class="grey--text"
								style="vertical-align: bottom"
							>
								<td width="30">#</td>
								<td>Menu Name</td>
								<td>Price</td>
								<td align="center">Qty</td>
							</tr>
							<tbody class="mt-n2">
								<tr
									class="mt-n2"
									v-for="(item, index) in data.product"
								>
									<td>{{ index + 1 }}</td>
									<td>{{ item.name }}</td>
									<td>
										{{ item.price | formatCurrency("IDR") }}
									</td>
									<td align="center">{{ item.quantity }}</td>
								</tr>
							</tbody>
						</table>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
	layout: "admin",
	data() {
		return {
			data: []
		};
	},
	created() {
		this.getData(this.$route.params.id);
	},
	computed: {
		...mapState({
			orders: state => state.orders.orders
		})
	},
	methods: {
		getData(val) {
			const res = this.orders.find(item => item._id === val);
			this.data = res;
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
<style scoped>
#sp {
	letter-spacing: 1px;
}
table {
	width: 100%;
}
th {
	height: 40px;
}
tbody td {
	height: 35px;
	vertical-align: top;
}
</style>
