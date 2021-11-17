export default {
	products(state) {
		var productsI = state.products;
		for (let index = 0; index < productsI.length; index++) {
			const no = productsI[index];
			no.no = index + 1;
		}
		return productsI;
	},
	product(state) {
		return state.product;
	},
	foods(state) {
		return state.products.filter(item => item.category === 'FOOD');
	},
	drinks(state) {
		return state.products.filter(item => item.category === 'DRINK');
	},
	index(state) {
		return state.index;
	},
	detail(state) {
		return state.detail;
	},
	modal(state) {
		return state.modal;
	}
};
