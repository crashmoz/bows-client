export default ({ app, store, redirect }) => {
	// if (!store.state.auth.isLoggedIn) {
	// 	if (app.$cookiz.get("connect.sid")) {
	// 		store.dispatch("auth/getUser");
	// 	} else {
	// 		return redirect("/login");
	// 	}
	// }
	const token = app.$cookiz.get("connect.sid");
	const status = store.state.auth.isLoggedIn;
	if (!token) {
		return redirect("/login");
	} else {
		if (!store.state.auth.isLoggedIn) {
			store.dispatch("auth/getUser");
		}
	}
};
