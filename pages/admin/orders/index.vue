<template>
	<v-card>
		<v-simple-table>
			<thead>
				<tr>
					<td>#</td>
					<td>ID</td>
					<td align="center">Items</td>
					<td align="center">Time</td>
					<td align="center">Amount</td>
					<td align="center">Status</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in orders" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<nuxt-link :to="`orders/${item._id}`" class="id-link">
							{{ item._id }}
						</nuxt-link>
					</td>
					<td align="center">{{ item.total_items }}</td>
					<td align="center">{{ item.time }}</td>
					<td align="center">
						Rp. {{ item.total_amount.toLocaleString("id-ID") }}
					</td>
					<td align="center">
						<v-chip
							:color="
								item.status === 'PENDING'
									? 'error'
									: item.status === 'ON PROCESS'
									? 'warning'
									: 'success'
							"
							text-color="white"
						>
							<strong>{{ item.status }}</strong>
						</v-chip>
					</td>
				</tr>
			</tbody>
		</v-simple-table>
	</v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
	layout: "admin",
	middleware: "authenticated",
	data() {
		return {};
	},
	mounted() {
		this.socket = this.$nuxtSocket({});
		this.getOrder();
		this.socket.on("order added", data => {
			this.addOrderList(data);
		});
		this.socket.on("update status", data => {
			this.updateStatus(data);
		});
	},
	computed: {
		...mapState({
			orders: state => state.orders.orders
		})
	},
	methods: {
		...mapActions({
			getOrder: "orders/getOrderToday",
			addOrderList: "orders/addOrderList"
		}),
		...mapMutations({
			updateStatus: "orders/UPDATE_STATUS_ORDER"
		})
	}
};
</script>
<style>
.id-link {
	text-decoration: none;
}
.id-link:hover {
	text-decoration: underline;
}
</style>
