export default {
	async addUser({ context }, payload) {
		try {
			await this.$axios.post("users", payload);
		} catch (error) {
			console.log(error);
		}
	},
	async updateUser({ context }, payload) {
		try {
			await this.$axios.put("users", payload);
		} catch (error) {
			console.log(error);
		}
	},
	deleteUser({ context }, id) {
		try {
			this.$axios.delete("users/" + id);
		} catch (error) {
			console.log(error);
		}
	},
	async getUsers({ commit }) {
		const res = await this.$axios.get("users");
		commit("setUsers", res.data.user);
	},
	setUser({ commit }, payload) {
		commit("SET_USER", payload);
	},
	toggleDetail({ commit }, payload) {
		commit("SET_USER", payload);
		commit("SET_DETAIL");
	},
	toggleModal({ commit }, payload) {
		commit("SET_MODAL");
	}
};
