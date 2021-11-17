<template>
	<div class="pr-4">
		<v-row>
			<v-col cols="12" sm="4" md="4">
				<v-dialog
					ref="dialog"
					v-model="modal1"
					persistent
					:return-value.sync="date1"
					width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="date1"
							label="From"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
							clearable
							@click:clear="date1 = null"
						></v-text-field>
					</template>
					<v-date-picker v-model="date1" scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="modal1 = false">
							Cancel
						</v-btn>
						<v-btn
							text
							color="primary"
							@click="$refs.dialog.save(date1)"
						>
							OK
						</v-btn>
					</v-date-picker>
				</v-dialog>
			</v-col>
			<v-col cols="12" sm="4" md="4">
				<v-dialog
					ref="dialog2"
					v-model="modal2"
					:return-value.sync="date2"
					persistent
					width="290px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="date2"
							label="To"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
							clearable
							@click:clear="date2 = null"
							:disabled="date1 ? false : true"
						></v-text-field>
					</template>
					<v-date-picker v-model="date2" scrollable :min="date1">
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="modal2 = false">
							Cancel
						</v-btn>
						<v-btn
							text
							color="primary"
							@click="$refs.dialog2.save(date2)"
						>
							OK
						</v-btn>
					</v-date-picker>
				</v-dialog>
			</v-col>
			<v-spacer></v-spacer>
			<v-col class="d-flex flex-row-reverse">
				<v-btn class="mt-4" color="success" @click="print_report">
					<v-icon left>mdi-printer</v-icon>
					Print
				</v-btn>
			</v-col>
		</v-row>

		<v-divider></v-divider>
		<report-table :data="data"></report-table>
	</div>
</template>
<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
	layout: "admin",
	data: () => ({
		dates: [],
		data: [],
		date1: "",
		date2: "",
		modal1: false,
		modal2: false
	}),
	computed: {},
	watch: {
		date1(val) {
			if (val) {
				this.dates = {
					start: this.date1
				};
			} else {
				this.setEmpty();
			}
		},
		date2(val) {
			if (val) {
				this.dates.end = val;
			} else {
				delete this.dates.end;
				this.date2 = "";
			}
			this.getDataByDate();
		},
		dates(val) {
			if (val.length === 0) {
				this.getData();
			} else {
				this.getDataByDate();
			}
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		setEmpty() {
			this.dates = [];
			this.date2 = "";
		},
		async getData() {
			const res = await this.$axios.get("transaction_report");
			this.data = res.data.data;
		},
		async getDataByDate() {
			const res = await this.$axios.post("test_report", this.dates);
			this.data = res.data;
		},
		print_report() {
			const dates = new Date();
			const d = String(dates.getDate()).padStart(2, "0");
			const m = String(dates.getMonth()).padStart(2, "0");
			const y = dates.getFullYear();
			const date = d + "-" + m + "-" + y;
			const doc = new jsPDF();
			doc.text("D'Bows", 10, 10);
			doc.text("Sales Report", 10, 30);
			doc.text(`Date : ${date}`, 50, 30);
			doc.line(0, 35, 400, 35);
			doc.autoTable({
				head: [
					[
						"ID",
						"Type",
						{
							content: "Payment",
							colSpan: 2,
							styles: {
								halign: "center",
								cellWidth: 20
							}
						},
						{
							content: "Items",
							styles: {
								halign: "center"
							}
						},
						"Amount"
					]
				],
				margin: { top: 50 },
				body: this.data,
				columnStyles: { 3: { cellWidth: 20 }, 4: { halign: "center" } },
				columns: [
					{ header: "ID", dataKey: "_id" },
					// { header: "Transaction Status", dataKey: "status" },
					{ header: "Type", dataKey: "order_type" },
					{ header: "Payment", dataKey: "payment_type" },
					{ header: "", dataKey: "wallet" },
					{
						header: "Items",
						dataKey: "total_items"
					},
					{ header: "Amount", dataKey: "total_amount" }
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
