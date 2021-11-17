<template>
    <v-card>
        <category-list
            :headers="headers"
            :categories="categories"
        ></category-list>
    </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
                },
                {
                    text: "Category Name",
                    value: "name",
                },
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
            categories: "category/categories",
        }),
    },
    mounted() {
        // this.getCategories();
    },
    methods: {
        ...mapActions({
            getCategories: "category/getCategories",
        }),
    },
};
</script>