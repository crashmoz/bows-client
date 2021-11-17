<template>
	<v-dialog
		v-model="dialog"
		scrollable
		persistent
		max-width="500px"
		transition="slide-y-reverse-transition"
		:fullscreen="$vuetify.breakpoint.xsOnly"
	>
		<v-card color="cyan darken-2" dark style="border-radius:10px">
			<v-btn text @click="close" small :ripple="false">
				<v-icon color="blue-grey lighten-4"
					>mdi mdi-chevron-double-down</v-icon
				>
			</v-btn>
			<v-card-title>
				<v-avatar
					size="150"
					class="mx-auto"
					:color="user.avatar ? '' : 'grey lighten-1'"
					elevation="2"
				>
					<img v-if="user.avatar" :src="urlImg + user.avatar" />
					<div v-else class="subtitle-2">No Image</div>
				</v-avatar>
				<v-container class="text-center">
					<div class="subtitle-1">{{ user.name }}</div>
					<div class="subtitle-1">{{ user.email }}</div>
				</v-container>
			</v-card-title>
			<v-card
				style="border-radius: 20px 20px 0 0;"
				height="380px"
				light
				class="px-6"
			>
				<v-simple-table>
					<template v-slot:default>
						<tbody>
							<tr>
								<td>Username</td>
								<td>: {{ user.username }}</td>
							</tr>
							<tr>
								<td>Gender</td>
								<td>: {{ user.gender }}</td>
							</tr>
							<tr>
								<td>Role</td>
								<td>: {{ user.role }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			urlImg: "home/urlAvatar",
			user: "users/user",
			dialog: "users/detail"
		})
	},
	methods: {
		...mapActions({
			close: "users/toggleDetail"
		})
	}
};
</script>
<style>
.radius {
	border-radius: 10px;
}
</style>
