export default {
	users(state) {
		var usersI = state.users;
		for (let index = 0; index < usersI.length; index++) {
			const no = usersI[index];
			no.no = index + 1;
		}
		return usersI;
	},
	user(state) {
		return state.user;
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
