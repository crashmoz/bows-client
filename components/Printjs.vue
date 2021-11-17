<template>
	<v-dialog v-model="dialog">
		<v-simple-table id="documentId">
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">
							Name
						</th>
						<th class="text-left">
							Email
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in user" :key="item.name">
						<td>{{ item.name }}</td>
						<td>{{ item.email }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<!-- <v-btn color="success" @click="prints('print', 'html')">print</v-btn> -->
	</v-dialog>
</template>
<script>
export default {
	props: ["user"],
	data() {
		return {
			dialog: false
		};
	},
	mounted() {
		this.$nuxt.$on("show-print", () => {
			this.dialog = true;
			// import("print-js").then(() => {
			// 	this.printReady = true;
			// 	this.prints();
			// });
		});
		this.printDocument();
	},
	methods: {
		// prints() {
		// 	print({
		// 		printable: this.user,
		// 		properties: ["name", "username", "email"],
		// 		type: "json"
		// 	});
		// },
		printDocument() {}
	}
};
</script>
