<template>
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        class="elevation-1"
    >
        <template v-slot:[`item.ava`]="{ item }">
            <v-card
                max-height="80"
                max-width="100"
                min-width="100"
                min-height="80"
                class="mr-4"
            >
                <v-card-subtitle v-if="!item.avatar" class="my-2 radius">
                    No image
                </v-card-subtitle>
                <v-img
                    v-else
                    :src="urlImg + item.avatar"
                    max-height="80"
                    max-width="100"
                    class="my-2 radius"
                    @click="showImg(urlImg + item.avatar)"
                ></v-img>
            </v-card>
        </template>
        <template v-slot:top>
            <v-card-title>
                <v-btn color="primary" class="mb-n2" dark @click="addForm">
                    New User
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <user-detail />
            <user-modal />
        </template>
        <template v-slot:[`item.action`]="{ item }">
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    :color="hover ? 'blue' : ''"
                    @click.stop="showDetail(item)"
                >
                    mdi-magnify
                </v-icon>
            </v-hover>
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    :color="hover ? 'blue' : ''"
                    @click.stop="editForm(item)"
                >
                    mdi-pencil
                </v-icon>
            </v-hover>
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    :color="hover ? 'blue' : ''"
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </v-hover>
        </template>
    </v-data-table>
</template>
<script>
import { mapActions, mapMutations } from "vuex";

export default {
    props: ["headers", "users", "urlImg"],
    data() {
        return {
            search: "",
        };
    },
    methods: {
        ...mapActions({
            detailModal: "users/toggleDetail",
            showForm: "users/toggleModal",
            setUser: "users/setUser",
            deleteUser: "users/deleteUser",
        }),
        ...mapMutations({
            setIndex: "users/SET_INDEX",
        }),
        showDetail(param) {
            this.detailModal(param);
        },
        addForm() {
            this.setIndex(-1);
            this.showForm();
        },
        async editForm(param) {
            const index = await this.users.indexOf(param);
            await this.setIndex(index);
            await this.setUser(param);
            this.showForm();
        },
        showImg(param) {
            this.$nuxt.$emit("show-image", param);
        },
        deleteItem(param) {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUser(param._id)
                        .then(() => {
                            this.$swal(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                            this.$nuxt.$emit("fetch-users");
                        })
                        .catch((err) => {
                            this.$swal(
                                "Failed!",
                                `Your file not deleted! ${err} `,
                                "error"
                            );
                        });
                }
            });
        },
    },
};
</script>
