<template>
    <v-card>
        <product-list
            :headers="headers"
            :products="products"
            :urlImg="urlImg"
        ></product-list>
        <modal-image></modal-image>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    layout: "admin",
    data() {
        return {
            headers: [
                {
                    text: "No",
                    align: "start",
                    sortable: false,
                    value: "no",
                    width: "1%",
                },
                {
                    text: "Image",
                    align: "center",
                    value: "images",
                    width: "1%",
                },
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Category", value: "category" },
                { text: "Description", value: "description" },
                {
                    text: "Action",
                    value: "action",
                    width: "120px",
                    align: "center",
                },
            ],
        };
    },
    computed: {
        ...mapGetters({
            urlImg: "home/urlProduct",
            products: "products/products",
        }),
    },
    created() {
        this.$nuxt.$on("fetch-products", () => {
            this.getProducts();
        });
    },
    mounted() {
        // this.getProducts();
    },
    methods: {
        ...mapActions({
            getProducts: "products/getProducts",
        }),
    },
};
</script>
