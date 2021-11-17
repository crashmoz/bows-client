<template>
    <!-- <v-app>
        <v-navigation-drawer app permanent right width="350">
        </v-navigation-drawer>

        <v-app-bar app dense class="primary">
            <v-toolbar-title class="white--text">D'Bows</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-scroll-x-reverse-transition>
                <v-text-field
                    v-if="showText"
                    v-model="message"
                    class="mt-6"
                    solo
                    dense
                    clearable
                    @blur="showText = !showText"
                ></v-text-field>
            </v-scroll-x-reverse-transition>
            <v-btn icon dark @focus="showTextField">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
        </v-main>
    </v-app> -->
    <div>
        <v-card tile style="position: sticky; top: 47px; z-index: 1">
            <v-btn color="light-blue" dark class="ma-2" @click="filterCat()">
                All Categories
            </v-btn>
            <v-btn
                color="light-blue"
                dark
                class="ma-2"
                v-for="category in categories"
                :key="category._id"
                @click="filterCat(category.name)"
            >
                {{ category.name }}
            </v-btn>
        </v-card>
        <div class="d-flex flex-wrap scroll">
            <v-card
                v-for="product in all"
                :key="product._id"
                width="100"
                height="135"
                class="ma-2"
                @click="addToCart(product)"
            >
                <v-img
                    :src="urlImg + product.image"
                    :lazy-src="urlImg + product.image"
                    width="100"
                    class="pointer"
                ></v-img>
                <v-card-text
                    class="text-center text-truncate subtitle-2 py-2 px-1"
                >
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ product.name }}
                            </span>
                        </template>
                        <span> {{ product.name }} </span>
                    </v-tooltip>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
    layout: "cashier",
    data() {
        return {
            all: [],
        };
    },
    computed: {
        ...mapState({
            categories: (state) => state.category.categories,
        }),
        ...mapGetters({
            products: "products/products",
            urlImg: "home/urlProduct",
        }),
    },
    created() {
        this.getProducts()
            .then(() => {
                this.all = this.products;
            })
            .catch((err) => {
                console.log(err);
            });
        this.getCategories();
        this.$nuxt.$on("search", (data) => {
            this.filterSearch(data);
        });
    },
    methods: {
        ...mapActions({
            getProducts: "products/getProducts",
            getCategories: "category/getCategories",
            addToCart: "orders/addToCart",
            addQty: "orders/addItemQty",
            removeQty: "orders/removeItemQty",
        }),
        ...mapMutations({
            removeItem: "orders/REMOVE_ITEM",
            cleanCart: "orders/cleanCart",
        }),
        filterCat(val) {
            if (!val) {
                this.all = this.products;
            } else {
                this.all = this.products.filter(
                    (item) => item.category === val
                );
            }
        },
        filterSearch(val) {
            if (!val) {
                this.filterCat();
            } else {
                let name = val.toLowerCase();
                this.all = this.products.filter((item) =>
                    item.name.toLowerCase().includes(name)
                );
            }
        },
    },
};
</script>
<style scoped>
.scroll {
    overflow: auto;
    /* overflow-y: hidden; */
}
.pointer {
    cursor: pointer;
}
</style>