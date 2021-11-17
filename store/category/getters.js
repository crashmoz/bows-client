export default {
    categories(state) {
        var categoriesI = state.categories;
        for (let index = 0; index < categoriesI.length; index++) {
            const no = categoriesI[index];
            no.no = index + 1;
        }
        return categoriesI;
    }
}