<template>
    <v-dialog
        v-model="dialog"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>
                <h3 class="headline mb-0">Add Category</h3>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="form" lazy-validation v-model="valid">
                        <v-text-field
                            ref="name"
                            label="Category name"
                            v-model="categories.name"
                            :rules="[(v) => !!v || 'This field is required']"
                            validate-on-blur
                            required
                        ></v-text-field>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="close"> Cancel </v-btn>
                <v-btn text color="primary" @click="save"> Save </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            valid: true,
            categories: {},
        };
    },
    computed: {
        ...mapState({
            dialog: (state) => state.category.modal,
        }),
    },
    methods: {
        ...mapActions({
            addCategory: "category/addCategory",
        }),
        ...mapMutations({
            toggleModal: "category/TOGGLE_MODAL",
        }),
        close() {
            this.toggleModal();
            this.$refs.form.reset();
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.save();
            }
        },
        save() {
            this.addCategory(this.categories)
                .then(() => {
                    this.close();
                    this.$swal("Success", "Data successfully added", "success");
                })
                .catch((err) => {
                    this.$swal("Failed", err, "error");
                });
        },
    },
};
</script>