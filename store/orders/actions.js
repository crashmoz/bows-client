// import { reject } from "core-js/fn/promise";

export default {
	addToCart({ commit, state }, payload) {
		const cartItem = state.items.find(item => item._id === payload._id);
		if (!cartItem) {
			commit("ADD_ITEM", payload);
		} else {
			commit("ADD_QTY", payload);
		}
	},
	addItemQty({ commit }, payload) {
		commit("ADD_QTY", payload);
	},
	removeItemQty({ commit, state }, payload) {
		const cartItem = state.items.find(item => item._id === payload._id);
		if (cartItem.quantity <= 1) {
			commit("REMOVE_ITEM", payload);
		} else {
			commit("REMOVE_QTY", payload);
		}
	},
	async order({ commit, state, getters }) {
		const data = getters.dataOrders;
		try {
			await this.$axios.post("order", data);
			commit("cleanCart");
		} catch (error) {
			console.log(error);
		}
	},
	getDataByDate({ commit }, param) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post("test_report", param)
				.then(result => {
					resolve(result.data);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	async getOrder({ commit }, payload) {
		const res = await this.$axios.get("order/" + payload);
		commit("SET_ORDER", res.data);
	},
	async getOrderToday({ commit }) {
		const res = await this.$axios.get("order_today");
		commit("SET_ORDERS", res.data);
	},
	addOrderList({ commit }, payload) {
		commit("ADD_ORDER_LIST", payload);
	},
	async updateStatusOrder({commit}, payload) {
		try{
			await this.$axios.post('changeStat_order', payload)
			// commit("UPDATE_STATUS_ORDER", payload)
		}catch (error) {
			console.log(error);
		}
	}
};
