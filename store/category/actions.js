export default {
    getCategories({ commit }) {
        this.$axios.get('categories').then((result) => {
            commit('FILL_CATEGORIES', result.data.data)
        }).catch((err) => {
            console.log(err);
        });
    },
    async addCategory({ commit }, payload) {
        try {
            await this.$axios.post('categories', payload)
        } catch (error) {
            console.log(error);
        }
    }
}