<template>
    <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        class="elevation-1"
    >
        <template v-slot:[`item.images`]="{ item }">
            <v-card
                max-height="80"
                max-width="100"
                min-width="100"
                min-height="80"
                class="mr-4"
            >
                <v-card-subtitle v-if="!item.image" class="my-2 radius"
                    >No image</v-card-subtitle
                >
                <v-img
                    v-else
                    :src="urlImg + item.image"
                    max-height="80"
                    max-width="100"
                    class="my-2 radius pointer"
                    @click="$nuxt.$emit('show-image', urlImg + item.image)"
                ></v-img>
            </v-card>
        </template>
        <template v-slot:top>
            <v-card-title>
                <v-btn color="primary" class="mb-n2" dark @click="addForm">
                    New Product
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
            <product-modal />
        </template>
        <template v-slot:[`item.action`]="{ item }">
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    :color="hover ? 'blue' : ''"
                >
                    mdi-magnify
                </v-icon>
            </v-hover>
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    :color="hover ? 'blue' : ''"
                    @click="editForm(item)"
                    >mdi-pencil</v-icon
                >
            </v-hover>
            <v-hover v-slot:default="{ hover }">
                <v-icon
                    :small="hover ? false : true"
                    :class="hover ? '' : 'ma-1'"
                    :color="hover ? 'blue' : ''"
                    @click="deleteItem(item)"
                    >mdi-delete</v-icon
                >
            </v-hover>
        </template>
    </v-data-table>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    props: ["headers", "products", "urlImg"],
    data() {
        return {
            search: "",
        };
    },
    computed: {
        ...mapGetters({
            modal: "products/modal",
        }),
    },
    methods: {
        ...mapActions({
            toggleModal: "products/toggleModal",
            delProduct: "products/delProduct",
        }),
        ...mapMutations({
            setIndex: "products/SET_INDEX",
        }),
        addForm() {
            this.setIndex(-1);
            this.toggleModal();
        },
        async editForm(param) {
            const index = await this.products.indexOf(param);
            await this.setIndex(index);
            this.toggleModal(param);
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
                    this.delProduct(param._id)
                        .then(() => {
                            this.$swal(
                                "Deleted!",
                                "Your data has been deleted.",
                                "success"
                            );
                            this.$nuxt.$emit("fetch-products");
                        })
                        .catch((err) => {
                            this.$swal(
                                "Failed!",
                                `Your data not deleted! ${err} `,
                                "error"
                            );
                        });
                }
            });
        },
    },
};
</script>
<style>
.pointer {
    cursor: zoom-in;
}
</style>
