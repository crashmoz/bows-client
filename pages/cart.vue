<template>
	<div>
		<v-toolbar
			dark
			color="blue lighten-2"
			style="position:sticky; top:0; z-index:1"
		>
			<v-btn icon dark to="/menu">
				<v-icon class="mdi-36px">mdi-chevron-left</v-icon>
			</v-btn>
			<v-toolbar-title class="align-self-center">My Cart</v-toolbar-title>
		</v-toolbar>
		<transition-group name="fade-transition">
			<v-card v-for="item in items" :key="item._id" class="mx-4 my-2">
				<v-card
					max-width="80"
					max-height="80"
					elevation="4"
					style="border-radius: 10px"
					class="float-left ma-4"
				>
					<v-img :src="urlImg + item.image"></v-img>
				</v-card>
				<v-card-text>
					<div
						class="text-truncate font-weight-bold blue--text text--lighten-2 pr-2"
					>
						{{ item.name }}
					</div>
					<p class="text-truncate">{{ item.description }}</p>
					<div
						class="text-primary font-weight-bold red--text text--lighten-2"
					>
						IDR
						{{
							(item.price * item.quantity).toLocaleString("id-ID")
						}}
					</div>
				</v-card-text>
				<v-btn
					dark
					color="white"
					small
					text
					elevation="2"
					absolute
					right
					bottom
					class="px-0"
					:ripple="false"
				>
					<div class="d-flex">
						<v-btn
							color="success"
							small
							icon
							@click="removeQty(item)"
						>
							<v-icon>mdi-minus</v-icon>
						</v-btn>
						<span
							class="black--text subtitle-2 mt-1"
							style="width:25px"
							>{{ item.quantity }}
						</span>
						<v-btn color="success" small icon @click="addQty(item)">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</div>
				</v-btn>
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							icon
							color="red"
							absolute
							top
							right
							v-bind="attrs"
							v-on="on"
							class="mt-n4 mr-n4"
							@click="removeItem(item)"
						>
							<v-icon>mdi-trash-can</v-icon>
						</v-btn>
					</template>
					<span>Remove</span>
				</v-tooltip>
			</v-card>
		</transition-group>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	layout: "cart",
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			urlImg: "home/urlProduct",
			items: "orders/cartItems",
			totalPrice: "orders/totalPrice",
			totalQty: "orders/totalQty"
		})
	},
	mounted() {},
	watch: {
		items(val) {
			if (!this.items || this.items.length === 0) {
				this.$router.push("/menu");
			}
		}
	},
	methods: {
		...mapActions({
			addQty: "orders/addItemQty",
			removeQty: "orders/removeItemQty"
		}),
		...mapMutations({
			removeItem: "orders/REMOVE_ITEM"
		}),
		back() {
			this.$router.back();
		}
	}
};
</script>
<style>
.bgcolor {
	background-color: rgb(223, 221, 221);
}
.stick {
	position: absolute;
	bottom: 0;
}
.content {
	height: 70vh;
}
</style>
