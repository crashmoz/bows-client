export default {
  async getReport({ commit }) {
    const res = await this.$axios.get('reports')
    commit('SET_REPORT', res.data)
  }
}