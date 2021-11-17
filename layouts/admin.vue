<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" fixed app>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :src="urlAva + user.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ user.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <div v-for="(item, i) in items" :key="i">
                    <v-list-item
                        v-if="!item.subLinks"
                        :to="item.to"
                        router
                        exact
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-group
                        v-else
                        :key="item.title"
                        :prepend-icon="item.icon"
                        no-action
                        v-model="item.active"
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="item.title"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item
                            v-for="sublink in item.subLinks"
                            :to="sublink.to"
                            :key="sublink.title"
                        >
                            <v-list-item-action>
                                <v-icon>{{ sublink.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-title v-text="sublink.title" />
                        </v-list-item>
                    </v-list-group>
                </div>
            </v-list>

            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="red" dark>
                        <v-icon left>mdi-lock</v-icon>
                        Logout
                    </v-btn>
                    <!-- <v-btn block color="red" dark v-else width="100%">
						<v-icon>mdi-lock</v-icon>
					</v-btn> -->
                </div>
            </template>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app color="info" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <!-- <v-app-bar-nav-icon @click.stop="mini = !mini" /> -->
            <v-toolbar-title v-text="title" />
        </v-app-bar>
        <v-main class="grey lighten-4">
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    middleware: "authenticated",
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: true,
            mini: true,
            items: [
                {
                    icon: "mdi-apps",
                    title: "Dashboard",
                    to: "/admin",
                },
                {
                    icon: "mdi-point-of-sale",
                    title: "orders",
                    to: "/admin/orders",
                },
                {
                    icon: "mdi-account-multiple",
                    title: "Users",
                    to: "/admin/users",
                },
                {
                    icon: "mdi-food",
                    title: "Menus",
                    to: "/admin/products",
                },
                {
                    icon: "mdi-folder-table",
                    title: "Category",
                    to: "/admin/category",
                },
                {
                    icon: "mdi-file-document",
                    title: "Report",
                    subLinks: [
                        {
                            title: "Sales Report",
                            to: "/admin/report",
                            icon: "mdi-file-pdf",
                        },
                    ],
                },
            ],
            title: "D'Bows",
        };
    },
    computed: {
        ...mapState({
            user: (state) => state.auth.current_user,
            urlAva: (state) => state.home.urlAvatar,
        }),
    },
    mounted() {
        this.getUsers();
        this.getProducts();
        this.getCategories();
    },
    methods: {
        ...mapActions({
            getUsers: "users/getUsers",
            getProducts: "products/getProducts",
            getCategories: "category/getCategories",
        }),
    },
    watch: {
        mini(val) {
            console.log(val);
        },
    },
};
</script>
