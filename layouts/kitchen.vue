<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			app
			permanent
			:mini-variant.sync="mini"
		>
			<v-list>
				<div v-for="(item, i) in items">
					<v-list-item
						v-if="!item.subLinks"
						:key="i"
						:to="item.to"
						router
						exact
					>
						<v-list-item-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{
								item.title
							}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-group
						v-else
						:key="item.title"
						:prepend-icon="item.icon"
						no-action
						v-model="item.active"
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title
									v-text="item.title"
								></v-list-item-title>
							</v-list-item-content>
						</template>

						<v-list-item
							v-for="sublink in item.subLinks"
							:to="sublink.to"
							:key="sublink.title"
						>
							<v-list-item-action>
								<v-icon>{{ sublink.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-title v-text="sublink.title" />
						</v-list-item>
					</v-list-group>
				</div>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar fixed app color="info" dark>
			<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
			<v-app-bar-nav-icon @click.stop="mini = !mini" />
			<v-toolbar-title v-text="title" />
			<v-spacer></v-spacer>
			<v-btn icon @click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main class="grey lighten-4">
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
import { mapActions } from "vuex";

export default {
	middleware: "authenticated",
	data() {
		return {
			mini: true,
			drawer: true,
			title: "D'Bows",
			items: [
				{
					icon: "mdi-apps",
					title: "Dashboard",
					to: "/kitchen"
				},
				{
					icon: "mdi-point-of-sale",
					title: "orders",
					to: "/kitchen/orders"
				}
			]
		};
	},
	created() {
		this.socket = this.$nuxtSocket({});
	},
	methods: {
		...mapActions({
			loggingOut: "auth/logout"
		}),
		async logout() {
			try {
				await this.loggingOut();
				this.$swal({
					icon: "success",
					title: "Logout successful"
				});
				this.$router.push("/login");
			} catch (error) {
				this.$swal({
					icon: "error",
					title: "Logout failed"
				});
			}
		}
	}
};
</script>
