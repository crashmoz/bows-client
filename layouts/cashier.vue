<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary>
        </v-navigation-drawer>
        <v-navigation-drawer
            app
            right
            permanent
            :width="$vuetify.breakpoint.mobile ? '340' : '395'"
            style="border-left-style: solid; border-color: grey"
        >
            <div class="pa-3 text-center grey lighten-3 tops">
                <v-btn fab small color="white" class="float-left">
                    <v-icon color="info">mdi-account</v-icon>
                </v-btn>
                <v-btn
                    text
                    rounded
                    color="info"
                    class="title font-weight-black"
                >
                    Dine In
                    <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn fab small color="info" class="float-right">
                    <v-icon>mdi-plus-thick</v-icon>
                </v-btn>
            </div>
            <v-divider></v-divider>
            <v-card
                tile
                outlined
                class="pa-2"
                v-for="item in items"
                :key="item._id"
            >
                <v-card elevation="0" class="d-flex justify-space-between">
                    <div style="width: 200px">
                        <strong>{{ item.name }}</strong>
                    </div>
                    <div class="red--text text--lighten-1 font-weight-medium">
                        x {{ item.quantity }}
                    </div>
                    <div
                        class="
                            subtitle-1
                            grey--text
                            text--darken-2
                            font-weight-bold
                        "
                        align="right"
                        style="font-family: Lato; width: 70px"
                    >
                        {{
                            (item.price * item.quantity).toLocaleString("id-ID")
                        }}
                    </div>
                </v-card>
                <div
                    class="grey--text text--darken-1 subtitle-2"
                    style="font-family: Lato"
                >
                    {{ item.price.toLocaleString("id-ID") }}
                </div>
            </v-card>
            <v-btn
                v-if="items.length > 0"
                class="
                    text-capitalize
                    stick-bot
                    blue--text
                    subtitle-2
                    font-weight-bold
                "
                color="grey lighten-2"
                elevation="1"
                block
                small
                @click="cleanCart"
            >
                Clear All
            </v-btn>
            <template v-slot:append>
                <v-btn block color="info" large class="button">
                    <strong class="title">
                        Rp.
                        {{
                            totalPrice ? totalPrice.toLocaleString("id-ID") : 0
                        }}
                    </strong>
                </v-btn>
            </template>
        </v-navigation-drawer>

        <v-app-bar app dense color="info" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn dark color="info" rounded small class="ml-2 upbtn">
                <v-icon left>mdi-record-circle-outline</v-icon>
                Table
            </v-btn>
            &nbsp;
            <v-btn dark color="info" rounded small class="ml-2 upbtn">
                <v-icon left>mdi-silverware-fork-knife</v-icon>
                In / Away
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                class="mt-6 mr-1"
                solo
                dense
                clearable
                light
                rounded
                style="max-width: 300px"
                append-icon="mdi-magnify"
            ></v-text-field>
        </v-app-bar>

        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            drawer: false,
            search: "",
        };
    },
    computed: {
        ...mapGetters({
            items: "orders/cartItems",
            totalPrice: "orders/totalPrice",
        }),
    },
    methods: {
        ...mapMutations({
            cleanCart: "orders/cleanCart",
        }),
        hintSearch(e) {
            $nuxt.$emit("search", e.target.value);
        },
    },
    watch: {
        search(val) {
            $nuxt.$emit("search", val);
        },
    },
};
</script>
<style scoped>
.v-btn {
    text-transform: none !important;
}
.upbtn {
    box-shadow: 0 0 3px rgb(255, 254, 254);
}
.setFont {
    font-family: Roboto, Lato, Oxygen;
}
.tops {
    position: sticky;
    top: 0;
    z-index: 1;
}
.stick-bot {
    position: sticky;
    bottom: 0;
}
</style>