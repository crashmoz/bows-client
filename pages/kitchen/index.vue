<template>
	<div>
		<v-row>
			<!-- <v-col
				v-for="sale in sales"
				:key="`${sale.title}`"
				cols="12"
				md="4"
			>
				<SalesGraph :sale="sale" />
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="statistic in statistics"
				:key="`${statistic.title}`"
				cols="12"
				md="6"
				lg="3"
			>
				<StatisticCard :statistic="statistic" />
			</v-col> -->
		</v-row>
	</div>
</template>
<script>
// import salesData from "~/data/sales.json";
// import statisticData from "~/data/statistics.json";

export default {
	layout: "kitchen",
	middleware: "authenticated",
	data() {
		return {
			// sales: salesData,
			// statistics: statisticData
		};
	}
};
</script>
<style></style>
