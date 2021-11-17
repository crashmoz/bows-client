export default {
	items(state) {
		return state.items;
	},
	totalQty(state) {
		let total = 0;
		state.items.forEach(item => {
			total += item.quantity;
		});
		return total;
	},
	totalPrice(state, getters) {
		if (state.items.length) {
			const sum = getters.items.reduce((total, item) => {
				return total + item.price;
			}, 0);
			return sum;
		}
	},
	cartItems(state, getters, rootState) {
		return state.items.map(({ _id, quantity }) => {
			const products = rootState.products.products.find(
				item => item._id === _id
			);
			products.quantity = quantity;
			return products;
		});
	},
	dataOrders(state, getters) {
		let data = {
			orderType: state.orderType,
			paymentType: state.paymentType,
			totalPrice: getters.totalPrice,
			totalQty: getters.totalQty,
			product: getters.items
		};
		if (state.paymentType && state.wallet) {
			data.wallet = state.wallet;
		}
		return data;
	}
};
