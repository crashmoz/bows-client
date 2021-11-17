<template>
    <v-container fluid class="pb-14">
        <v-row>
            <v-col v-for="item in menu" :key="item._id" cols="12" md="3" sm="4">
                <v-card elevation="4" class="pb-2">
                    <v-img
                        :src="urlImg + item.image"
                        :lazy-src="urlImg + item.image"
                        aspect-ratio="1"
                        @click="$nuxt.$emit('show-detail-product', item)"
                        class="pointer"
                        height="200"
                    ></v-img>
                    <v-card-title class="text-truncate black-text">
                        {{ item.name }}
                    </v-card-title>
                    <v-card-subtitle class="text-truncate">
                        {{ item.description }}
                    </v-card-subtitle>
                    <v-card-text
                        class="
                            text-h6
                            font-weight-bold
                            orange--text
                            text--darken-4
                            pb-2
                        "
                    >
                        {{ item.price.toLocaleString("id-ID") }}
                    </v-card-text>
                    <v-scale-transition>
                        <div v-if="itemStatus(item._id)" class="d-flex dbtn">
                            <v-btn
                                class="minus white"
                                dark
                                @click="removeQty(item)"
                                elevation="4"
                                rounded
                                icon
                            >
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <div
                                class="
                                    black--text
                                    font-weight-bold
                                    h6
                                    px-3
                                    mt-1
                                "
                            >
                                {{ itemStatus(item._id).quantity }}
                            </div>
                            <v-btn
                                class="plus white"
                                dark
                                @click="addQty(item)"
                                elevation="4"
                                rounded
                                icon
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-btn
                            v-else
                            class="plus white"
                            @click="addItem(item)"
                            elevation="4"
                            rounded
                            dark
                            transition="scale-transition"
                            absolute
                            right
                            bottom
                        >
                            Add
                            <v-icon right>mdi-plus</v-icon>
                        </v-btn>
                    </v-scale-transition>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    props: ["menu"],
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            urlImg: "home/urlProduct",
            items: "orders/items",
        }),
    },
    methods: {
        ...mapActions({
            addItem: "orders/addToCart",
            addQty: "orders/addItemQty",
            removeQty: "orders/removeItemQty",
        }),
        itemStatus(id) {
            return this.items.find((item) => item._id === id);
        },
    },
    filters: {
        formatCurrency(value, currency) {
            var formatter = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: currency,
                minimumFractionDigits: 0,
            });
            return formatter.format(value);
        },
    },
};
</script>
<style>
.pointer {
    cursor: pointer;
}

.plus {
    background-image: linear-gradient(
        to right,
        #77a1d3 0%,
        #79cbca 51%,
        #77a1d3 100%
    );
}
.plus {
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
}

.plus:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

.minus {
    background-image: linear-gradient(
        to right,
        #eb7070 0%,
        #f5b3b1 51%,
        #eb7070 100%
    );
}
.minus {
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
}

.minus:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

.dbtn {
    position: absolute;
    right: 20px;
    bottom: 15px;
}
</style>