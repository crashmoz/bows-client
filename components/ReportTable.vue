<template>
	<div>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center" width="10">No</th>
						<th class="text-center">
							Date
						</th>
						<th class="text-center">Items</th>
						<th class="text-center">
							Amount
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in data" :key="item.id">
						<td class="text-center">{{ index + 1 }}</td>
						<td class="text-center">{{ item.date }}</td>
						<td class="text-center">{{ item.total_items }}</td>
						<td class="text-center">
							Rp. {{ item.total_amount.toLocaleString("id-ID") }}
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>
<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
	props: ["data"],
	data() {
		return {};
	}
};
</script>
