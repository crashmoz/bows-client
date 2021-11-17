<template>
    <v-card>
        <v-card-title>
            <span class="headline" ref="title">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-form ref="form" lazy-validation v-model="valid">
                    <v-text-field
                        ref="name"
                        label="Name"
                        v-model="product.name"
                        :rules="[(v) => !!v || 'This field is required']"
                        validate-on-blur
                        required
                    ></v-text-field>
                    <v-text-field
                        prefix="Rp. "
                        v-model="product.price"
                        label="Price"
                        :rules="[
                            () => !!product.price || 'This field is required',
                            () =>
                                /^[0-9]+$/.test(product.price) ||
                                'Price must be number',
                            () =>
                                (product.price && product.price.length >= 4) ||
                                'Min 4 number',
                        ]"
                        maxlength="7"
                        validate-on-blur
                        required
                    ></v-text-field>
                    <v-select
                        :items="categories"
                        item-text="name"
                        item-value="name"
                        v-model="product.category"
                        label="Category"
                        :rules="[(v) => !!v || 'You must choose at least one']"
                        validate-on-blur
                        required
                    ></v-select>
                    <v-row class="mx-1 pb-6">
                        <v-card
                            max-height="80"
                            max-width="100"
                            min-width="100"
                            min-height="80"
                            class="mr-4"
                            v-if="imgUpload || product.image"
                        >
                            <v-img
                                v-if="imgUpload"
                                :src="imgUpload"
                                max-height="80"
                                max-width="100"
                                class="my-2 radius"
                                @click="$nuxt.$emit('show-image', imgUpload)"
                            ></v-img>
                            <v-img
                                v-else
                                :src="urlImg + product.image"
                                max-height="80"
                                max-width="100"
                                class="my-2 radius"
                                @click="
                                    $nuxt.$emit(
                                        'show-image',
                                        urlImg + product.image
                                    )
                                "
                            ></v-img>
                        </v-card>
                        <v-file-input
                            show-size
                            accept="image/*"
                            label="Pick an image"
                            prepend-icon="mdi-camera"
                            chips
                            @change="fileSelected"
                        ></v-file-input>
                    </v-row>
                    <v-textarea
                        label="Description"
                        v-model="product.description"
                        no-resize
                        rows="3"
                        row-height="10"
                        maxlength="255"
                        :rules="[(v) => !!v || 'Description is required']"
                    ></v-textarea>
                </v-form>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="validate">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            product: {},
            valid: true,
            imgUpload: "",
            // category: ["FOOD", "DRINK"],
            img: "",
        };
    },
    computed: {
        ...mapState({
            categories: (state) => state.category.categories,
        }),
        ...mapGetters({
            urlImg: "home/urlProduct",
            index: "products/index",
            productData: "products/product",
        }),
        formTitle() {
            return this.index === -1 ? "New Menu" : "Edit Menu";
        },
    },
    mounted() {
        this.getCategories();
    },
    watch: {
        productData(val) {
            if (val) {
                this.product = Object.assign({}, val);
            }
        },
    },
    methods: {
        ...mapActions({
            getCategories: "category/getCategories",
            toggleModal: "products/toggleModal",
            addProduct: "products/addProduct",
            updateProduct: "products/updateProduct",
        }),
        fileSelected(e) {
            if (e === undefined) {
                this.imgUpload = "";
            } else {
                this.resize(e);
            }
        },
        resize(e) {
            // const width = 500;
            // const height = 500;
            const fileName = e.name;
            const reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                (img.onload = () => {
                    const elem = document.createElement("canvas");
                    const max_size = 500;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.canvas.toBlob(
                        (blob) => {
                            const file = new File([blob], fileName, {
                                type: "image/jpeg",
                                lastModified: Date.now(),
                            });
                            this.imgUpload = URL.createObjectURL(file);
                            this.img = file;
                        },
                        "image/jpeg",
                        1
                    );
                }),
                    (reader.onerror = (error) => console.log(error));
            };
        },
        validate() {
            console.log(this.product);
            if (this.$refs.form.validate()) {
                this.save();
            }
        },
        close() {
            this.toggleModal();
            this.$refs.form.reset();
            this.product = {};
            this.imgUpload = "";
        },
        save() {
            let data = new FormData();
            if (this.img !== "") {
                if (data.image) {
                    data.image = this.img;
                } else {
                    data.append("image", this.img);
                }
            }
            Object.keys(this.product).forEach((key) =>
                data.append(key, this.product[key])
            );

            if (this.index > -1) {
                // Update product
                this.updateProduct(data)
                    .then(() => {
                        this.close();
                        this.$swal(
                            "Success",
                            "Data successfully updated",
                            "success"
                        );
                        this.$nuxt.$emit("fetch-products");
                    })
                    .catch((err) => {
                        this.$swal("Failed", err, "error");
                    });
                // for (var pair of data.entries()) {
                // 	console.log(pair[0] + " : " + pair[1]);
                // }
            } else {
                // Save new product
                this.addProduct(data)
                    .then(() => {
                        this.close();
                        this.$swal(
                            "Success",
                            "Data successfully added",
                            "success"
                        );
                        this.$nuxt.$emit("fetch-products");
                    })
                    .catch((err) => {
                        this.$swal("Failed", err, "error");
                    });
            }
        },
    },
};
</script>
