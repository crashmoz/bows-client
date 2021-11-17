<template>
	<div>
		<v-btn color="info" @click="test">Test</v-btn>
		{{ users }}
	</div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
	data() {
		return {
			users: [],
			data_user: []
		};
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		async getUsers() {
			const res = await this.$axios.get("http://localhost:5000/users");
			this.users = res.data.user;
		},
		test() {
			const doc = new jsPDF();
			doc.text("Company Name: D'Bows", 10, 10);
			doc.text("Sales Report", 10, 30);
			doc.text("Date : 17-05-2021", 50, 30);
			doc.line(0, 35, 400, 35);
			doc.autoTable({
				head: [["Name", "Username", "Email"]],
				margin: { top: 50 },
				body: this.users,
				columns: [
					{ header: "Name", dataKey: "name" },
					{ header: "Username", dataKey: "username" },
					{ header: "Email", dataKey: "email" }
				]
			});
			doc.output("dataurlnewwindow");
		}
	}
};
</script>

<style scoped>
.container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
h1 {
	font-weight: 400;
}
.name {
	color: #3b8070;
}
p {
	margin-top: 20px;
}
</style>
