<template>
    <v-card>
        <user-list
            :headers="headers"
            :users="users"
            :urlImg="urlImg"
        ></user-list>
        <modal-image></modal-image>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    layout: "admin",
    middleware: "authenticated",
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
                { text: "Avatar", align: "center", value: "ava", width: "1%" },
                { text: "Name", value: "name" },
                { text: "Username", value: "username" },
                { text: "Email", value: "email" },
                { text: "Role", value: "role" },
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
            urlImg: "home/urlAvatar",
            users: "users/users",
        }),
    },
    created() {
        this.$nuxt.$on("fetch-users", () => {
            this.getUsers();
        });
    },
    mounted() {
        // this.getUsers();
    },
    methods: {
        ...mapActions({
            getUsers: "users/getUsers",
        }),
    },
};
</script>
