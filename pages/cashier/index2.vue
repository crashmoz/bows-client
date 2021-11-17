<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card
                    rounded="lg"
                    elevation="0"
                    height="87vh"
                    class="scroll mt-n4"
                >
                    <v-row class="ma-2 d-flex">
                        <v-col
                            v-for="item in products"
                            :key="item._id"
                            cols="2"
                            align="center"
                        >
                            <v-card
                                width="110"
                                @click="addToCart(item)"
                                class="text-center"
                                elevation="4"
                            >
                                <v-img
                                    :src="urlImg + item.image"
                                    :lazy-src="urlImg + item.image"
                                    aspect-ratio="1"
                                    @click="
                                        $nuxt.$emit('show-detail-product', item)
                                    "
                                    class="pointer"
                                ></v-img>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-card-text
                                            v-bind="attrs"
                                            v-on="on"
                                            class="
                                                text-truncate
                                                py-2
                                                font-weight-bold
                                            "
                                        >
                                            {{ item.name }}
                                        </v-card-text>
                                    </template>
                                    <span>{{ item.name }}</span>
                                </v-tooltip>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <!-- <v-col cols="4">
				<v-sheet min-height="80vh" rounded="lg"> </v-sheet>
			</v-col> -->
            <v-navigation-drawer
                permanent
                floating
                right
                class="mr-2 rounded-lg"
                width="350"
                height="87vh"
                color="grey lighten-3"
            >
                <v-card height="73.5vh" class="scroll">
                    <v-btn
                        class="info stick"
                        :hover="false"
                        tile
                        small
                        block
                        @click="dineIn = !dineIn"
                    >
                        {{ dineIn ? "Dine in" : "Take Away" }}
                        <v-icon right>mdi-chevron-down</v-icon>
                    </v-btn>
                    <v-card
                        class="pa-2 pr-7"
                        tile
                        outlined
                        v-for="item in items"
                        :key="item._id"
                    >
                        <v-btn
                            icon
                            absolute
                            right
                            top
                            x-small
                            color="red"
                            class="mr-n3 mt-n2"
                            @click="removeItem(item)"
                        >
                            <v-icon small color="red">mdi-close</v-icon>
                        </v-btn>
                        <div class="d-flex justify-space-between body-2">
                            <span>
                                {{ item.name }}
                            </span>
                            <span>
                                Rp {{ item.price.toLocaleString("id-ID") }}
                            </span>
                        </div>
                        <div class="d-flex justify-space-between body-2 py-1">
                            <span> Quantity </span>
                            <div>
                                <v-btn
                                    color="error"
                                    icon
                                    x-small
                                    @click="removeQty(item)"
                                    elevation="2"
                                >
                                    <v-icon small>mdi-minus</v-icon>
                                </v-btn>
                                <span class="px-2 mb-2">
                                    {{ item.quantity }}
                                </span>
                                <v-btn
                                    color="primary"
                                    icon
                                    x-small
                                    @click="addQty(item)"
                                    elevation="2"
                                >
                                    <v-icon small>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <div class="d-flex justify-space-between body-2 py-2">
                            <span> Subtotal : </span>
                            <span>
                                Rp
                                {{
                                    (item.price * item.quantity).toLocaleString(
                                        "id-ID"
                                    )
                                }}
                            </span>
                        </div>
                    </v-card>
                    <v-btn
                        v-if="items.length > 0"
                        class="text-capitalize stick-bot text--disabled"
                        color="white"
                        elevation="1"
                        block
                        small
                        @click="cleanCart"
                    >
                        Clear Sale
                    </v-btn>
                </v-card>
                <v-row class="my-n2">
                    <v-col>
                        <v-btn color="primary" text block> Save Bill </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="primary" text block> Print Bill </v-btn>
                    </v-col>
                </v-row>
                <v-btn
                    color="primary"
                    bottom
                    block
                    :disabled="!totalPrice"
                    @click="$nuxt.$emit('show-modal-checkout')"
                >
                    <span class="text-capitalize">
                        Charge &nbsp; Rp &nbsp;
                    </span>
                    {{ totalPrice ? totalPrice.toLocaleString("id-ID") : 0 }}
                </v-btn>
            </v-navigation-drawer>
        </v-row>
        <modal-checkout></modal-checkout>
    </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    layout: "cashier",
    data: () => ({
        dineIn: true,
        // items: [],
    }),
    computed: {
        ...mapGetters({
            products: "products/products",
            urlImg: "home/urlProduct",
            items: "orders/cartItems",
            totalPrice: "orders/totalPrice",
        }),
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        ...mapActions({
            getProducts: "products/getProducts",
            addToCart: "orders/addToCart",
            addQty: "orders/addItemQty",
            removeQty: "orders/removeItemQty",
        }),
        ...mapMutations({
            removeItem: "orders/REMOVE_ITEM",
            cleanCart: "orders/cleanCart",
        }),
    },
};
</script>
<style>
.scroll {
    overflow: auto;
    /* overflow-y: hidden; */
}
.radius {
    border-radius: 10px;
}
.stick {
    position: sticky;
    position: -webkit-sticky;
    z-index: 1;
    top: 0;
}
.stick-bot {
    position: sticky;
    bottom: 0;
}
</style>
