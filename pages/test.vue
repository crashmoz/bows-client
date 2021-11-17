<template>
    <v-container fluid>
        <v-row align="center">
            <v-col cols="6">
                <v-subheader> Custom items </v-subheader>
            </v-col>

            <v-col cols="6">
                <v-select
                    v-model="select"
                    :items="items"
                    item-text="state"
                    item-value="state"
                    value="state"
                    label="Select"
                ></v-select>
            </v-col>
        </v-row>
        {{ select }}
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            select: "",
            items: [
                { state: "Florida", abbr: "FL" },
                { state: "Georgia", abbr: "GA" },
                { state: "Nebraska", abbr: "NE" },
                { state: "California", abbr: "CA" },
                { state: "New York", abbr: "NY" },
            ],
        };
    },
    computed: {
        ...mapState({
            categories: (state) => state.category.categories,
        }),
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        ...mapActions({
            getCategories: "category/getCategories",
        }),
    },
};
</script>