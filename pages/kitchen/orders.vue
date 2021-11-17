<template>
	<div>
		<v-simple-table loading loading-text="Loading...Please wait">
			<template v-slot:default>
				<thead>
					<tr>
						<th width="10">#</th>
						<th>ID</th>
						<th class="text-left">Menu</th>
						<th class="text-center">Qty</th>
						<th class="text-center">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in orders"
						:key="item._id"
						class="hov"
					>
						<td>{{ index + 1 }}</td>
						<td>{{ item._id }}</td>
						<td>{{ item.product[0].name }}</td>
						<td align="center">{{ item.total_items }}</td>
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
								class="status"
								@click="changeStatus(item)"
							>
								<strong>{{ item.status }}</strong>
							</v-chip>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
	layout: "kitchen",
	middleware: "authenticated",
	data() {
		return {};
	},
	computed: {
		...mapState({
			orders: state => state.orders.orders
		})
	},
	mounted() {
		this.getOrder();
		this.socket = this.$nuxtSocket({});
		this.socket.on("order added", data => {
			this.addOrderList(data);
		});
		this.socket.on("update status", data => {
			this.updateStat(data);
		});
	},
	methods: {
		...mapActions({
			getOrder: "orders/getOrderToday",
			addOrderList: "orders/addOrderList",
			updateStatus: "orders/updateStatusOrder"
		}),
		...mapMutations({
			updateStat: "orders/UPDATE_STATUS_ORDER"
		}),
		changeStatus(val) {
			let data = Object.assign({}, val);
			if (data.status === "PENDING") {
				data.status = "ON PROCESS";
			} else {
				data.status = "FINISH";
			}
			this.$axios.post("changeStat_order", data);
		}
	}
};
</script>
<style scoped>
.status {
	cursor: pointer;
	box-shadow: 0px 2px 2px grey;
}
tbody .hov:hover {
	background-color: yellow;
}
</style>
