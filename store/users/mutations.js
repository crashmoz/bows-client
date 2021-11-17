export default {
	setUsers(state, payload) {
		state.users = payload;
	},
	SET_USER(state, payload) {
		state.user = payload;
	},
	SET_INDEX(state, payload) {
		state.index = payload;
	},
	SET_DETAIL(state) {
		state.detail = !state.detail;
	},
	SET_MODAL(state) {
		state.modal = !state.modal;
	}
};
