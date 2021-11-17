export default {
    FILL_CATEGORIES(state, payload) {
        state.categories = payload
    },
    TOGGLE_MODAL(state) {
        state.modal = !state.modal
    }
}