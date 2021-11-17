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
						v-model="user.name"
						:rules="[v => !!v || 'This field is required']"
						validate-on-blur
						required
					></v-text-field>
					<v-text-field
						v-model="user.username"
						label="Username"
						ref="username"
						:rules="[v => !!v || 'Username is required']"
						validate-on-blur
						required
					></v-text-field>
					<v-text-field
						v-model="user.email"
						label="E-mail"
						:rules="emailRules"
						validate-on-blur
						required
					></v-text-field>
					<v-select
						:items="gender"
						v-model="user.gender"
						label="Gender"
						:rules="[v => !!v || 'This field is required']"
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
							v-if="imgUpload || user.avatar"
						>
							<v-img
								v-if="imgUpload"
								:src="imgUpload"
								max-height="80"
								max-width="100"
								class="my-2 radius"
								@click="showImg(imgUpload)"
							></v-img>
							<v-img
								v-else
								:src="urlImg + user.avatar"
								max-height="80"
								max-width="100"
								class="my-2 radius"
								@click="showImg(urlImg + user.avatar)"
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
					<v-select
						:items="role"
						v-model="user.role"
						label="Role"
						:rules="[v => !!v || 'This field is required']"
						validate-on-blur
						required
					></v-select>
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
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			user: {},
			imgUpload: "",
			valid: true,
			role: ["ADMIN", "MANAGER", "CASHIER", "WAITERS"],
			gender: ["Laki-laki", "Perempuan"],
			emailRules: [
				v => !!v || "E-mail is required",
				v => /.+@.+/.test(v) || "E-mail must be valid"
			]
		};
	},
	computed: {
		...mapGetters({
			urlImg: "home/urlAvatar",
			index: "users/index",
			userData: "users/user"
		}),
		formTitle() {
			return this.index === -1 ? "New Item" : "Edit Item";
		}
	},
	watch: {
		userData(val) {
			if (val) {
				this.user = Object.assign({}, val);
			}
		}
	},
	methods: {
		...mapActions({
			toggleModal: "users/toggleModal",
			addUser: "users/addUser",
			updateUser: "users/updateUser"
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
			reader.onload = event => {
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
						blob => {
							const file = new File([blob], fileName, {
								type: "image/jpeg",
								lastModified: Date.now()
							});
							this.imgUpload = URL.createObjectURL(file);
							this.img = file;
						},
						"image/jpeg",
						1
					);
				}),
					(reader.onerror = error => console.log(error));
			};
		},
		showImg(param) {
			this.$nuxt.$emit("show-image", param);
		},
		close() {
			this.toggleModal();
			this.$refs.form.reset();
			this.user = {};
			this.imgUpload = "";
		},
		validate() {
			if (this.$refs.form.validate()) {
				this.save();
			}
		},
		save() {
			let data = new FormData();
			if (this.img !== "") {
				if (data.avatar) {
					data.avatar = this.img;
				} else {
					data.append("avatar", this.img);
				}
			}
			Object.keys(this.user).forEach(key =>
				data.append(key, this.user[key])
			);

			if (this.index > -1) {
				// Update data
				this.updateUser(data)
					.then(() => {
						this.close();
						this.$swal(
							"Success",
							"Data successful updated",
							"success"
						);
						this.$nuxt.$emit("fetch-users");
					})
					.catch(err => {
						this.$swal("Failed", err, "error");
					});
			} else {
				// Save new data
				this.addUser(data)
					.then(() => {
						this.close();
						this.$swal(
							"Success",
							"Data successful added",
							"success"
						);
						this.$nuxt.$emit("fetch-users");
					})
					.catch(err => {
						this.$swal("Failed", err, "error");
					});
			}
		}
	}
};
</script>
