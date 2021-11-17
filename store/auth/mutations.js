export default {
  SET_USER(state, payload) {
    state.current_user = payload;
  },
  SET_STATUS(state, payload) {
    state.isLoggedIn = payload;
  }
}