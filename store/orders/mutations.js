export default {
	ADD_ORDER_TYPE(state, val) {
		state.orderType = val;
	},
	ADD_PAYMENT_TYPE(state, val) {
		state.paymentType = val;
	},
	ADD_WALLET(state, val) {
		state.wallet = val;
	},
	ADD_ITEM(state, { _id, price, name }) {
		state.items.push({
			_id: _id,
			name: name,
			price: price,
			quantity: 1
		});
	},
	ADD_QTY(state, { _id, price }) {
		const cartItem = state.items.find(item => item._id === _id);
		cartItem.quantity++;
		cartItem.price = cartItem.quantity * price;
	},
	REMOVE_QTY(state, payload) {
		const cartItem = state.items.find(item => item._id === payload._id);
		cartItem.quantity--;
		cartItem.price = cartItem.quantity * payload.price;
	},
	REMOVE_ITEM(state, { _id }) {
		const index = state.items.findIndex(item => item._id === _id);
		state.items.splice(index, 1);
	},
	cleanCart(state) {
		state.items = [];
		state.orderType = "";
		state.paymentType = "";
		state.wallet = "";
	},
	SET_ORDER(state, payload) {
		state.order = payload;
	},
	SET_ORDERS(state, payload) {
		state.orders = payload;
	},
	ADD_ORDER_LIST(state, payload) {
		state.orders.unshift(payload);
	},
	UPDATE_STATUS_ORDER(state, payload) {
		const data = state.orders.find(item => item._id === payload._id);
		data.status = payload.status;
	}
};
