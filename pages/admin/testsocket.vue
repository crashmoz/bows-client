<template>
	<div>
		<v-btn color="success" @click="send">emit event</v-btn>
		{{ test }}
	</div>
</template>
<script>
export default {
	data() {
		return {
			test: ""
		};
	},
	mounted() {
		this.socket = this.$nuxtSocket({});
		this.socket.on("connect", () => {
			console.log(this.socket.id);
		});
		this.socket.on("new message", a => {
			console.log(a);
			// this.filltext();
		});
	},
	methods: {
		send() {
			// this.socket.emit("order added", "test");
			this.$axios.get("test_socket");
		},
		filltext() {
			this.test = "test";
		}
	}
};
</script>
