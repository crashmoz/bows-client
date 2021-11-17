export default {
	SET_PRODUCTS(state, payload) {
		state.products = payload;
	},
	SET_PRODUCT(state, payload) {
		state.product = payload;
	},
	SET_MODAL(state) {
		state.modal = !state.modal;
	},
	SET_INDEX(state, payload) {
		state.index = payload;
	}
};
