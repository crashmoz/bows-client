<template>
	<v-app>
		<v-main class="bm">
			<nuxt />
		</v-main>
	</v-app>
</template>
<script>
export default {
	data() {
		return {};
	}
};
</script>
<style>
.bm {
	background: rgb(72, 198, 239);
	background: linear-gradient(
		0deg,
		rgba(72, 198, 239, 1) 0%,
		rgba(111, 134, 214, 1) 100%
	);
}
</style>
