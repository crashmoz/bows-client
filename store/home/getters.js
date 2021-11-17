export default {
	urlAvatar(state) {
		return state.urlAvatar;
	},
	urlProduct(state) {
		return state.urlProduct;
	},
	imgModal(state) {
		return state.imgModal;
	},
	dateDMY() {
		const dates = new Date();
		const d = String(dates.getDate()).padStart(2, "0");
		const m = String(dates.getMonth() + 1).padStart(2, "0");
		const y = dates.getFullYear();
		const date = d + "-" + m + "-" + y;
		return date;
	},
	dateYMD() {
		const dates = new Date();
		const d = String(dates.getDate()).padStart(2, "0");
		const m = String(dates.getMonth() + 1).padStart(2, "0");
		const y = dates.getFullYear();
		const date = y + "-" + m + "-" + d;
		return date;
	}
};
