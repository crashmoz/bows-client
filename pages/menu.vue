<template>
    <div>
        <v-app-bar app dense>
            <v-tabs v-model="tab" background-color="primary" dark fixed-tabs>
                <v-tab
                    v-for="item in categories"
                    :key="item._id"
                    :href="'#tab-' + item.name"
                >
                    {{ item.name }}
                </v-tab>
            </v-tabs>
        </v-app-bar>

        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in categories"
                :key="item._id"
                :value="'tab-' + item.name"
            >
                <menu-tabs :menu="filterMenu(item.name)"></menu-tabs>
            </v-tab-item>
        </v-tabs-items>
        <detail-product></detail-product>
        <order-snackbar></order-snackbar>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            tab: null,
        };
    },
    computed: {
        ...mapState({
            categories: (state) => state.category.categories,
            products: (state) => state.products.products,
        }),
    },
    mounted() {
        this.getCategories();
        this.getProducts();
    },
    methods: {
        ...mapActions({
            getCategories: "category/getCategories",
            getProducts: "products/getProducts",
        }),
        filterMenu(val) {
            return this.products.filter((item) => item.category === val);
        },
    },
};
</script>