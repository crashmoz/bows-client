export default {
	async getProducts({ commit }) {
		try {
			const res = await this.$axios.get("products");
			commit("SET_PRODUCTS", res.data.products);
		} catch (error) {
			console.error(error);
		}
	},
	async addProduct({ context }, payload) {
		try {
			await this.$axios.post("products", payload);
		} catch (err) {
			console.error(err);
		}
	},
	async updateProduct({ context }, payload) {
		try {
			await this.$axios.put("products", payload);
		} catch (err) {
			console.log(err);
		}
	},
	async delProduct({ context }, payload) {
		try {
			await this.$axios.delete("products/" + payload);
		} catch (err) {
			console.error(err);
		}
	},
	toggleModal({ commit }, payload) {
		commit("SET_PRODUCT", payload);
		commit("SET_MODAL");
	}
};
