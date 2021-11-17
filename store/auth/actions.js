export default {
	login({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios
				.post("http://localhost:5000/auth/login", payload, {
					withCredentials: true
				})
				.then(result => {
					resolve();
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	async getUser({ commit }) {
		try {
			const res = await this.$axios.get(
				"http://localhost:5000/auth/current_user",
				{ withCredentials: true }
			);
			commit("SET_STATUS", true);
			commit("SET_USER", res.data.current_user);
		} catch (error) {
			this.$cookiz.remove("connect.sid");
			$nuxt.$router.push("/login");
		}
	},
	async logout({ commit }) {
		try {
			await this.$axios.get("auth/logout");
			commit("SET_STATUS", false);
			commit("SET_USER", {});
		} catch (error) {
			console.log(error);
		}
	}
};
