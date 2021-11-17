<template>
    <v-data-table
        :headers="headers"
        :items="categories"
        :search="search"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-card-title>
                <v-btn color="primary" class="mb-n2" dark @click="addForm">
                    New Category
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="search"
                    single-line
                    hide-details=""
                ></v-text-field>
            </v-card-title>
            <category-modal></category-modal>
        </template>
        <template v-slot:[`item.action`]="{ item }">
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    color="info"
                    @click="editForm(item)"
                >
                    mdi-pencil
                </v-icon>
            </v-hover>
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    color="error"
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </v-hover>
        </template>
    </v-data-table>
</template>
<script>
import { mapMutations } from "vuex";

export default {
    props: ["headers", "categories"],
    data() {
        return {
            search: "",
        };
    },
    computed: {},
    methods: {
        ...mapMutations({
            toggleModal: "category/TOGGLE_MODAL",
        }),
        addForm() {
            this.toggleModal();
        },
        editForm() {},
        deleteItem() {},
    },
};
</script>