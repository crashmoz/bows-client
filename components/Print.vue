<template>
	<div></div>
</template>
<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
	layout: "admin",
	name: "HelloWorld",
	props: {
		msg: String
	},
	methods: {
		downloadWithCSS() {
			const doc = new jsPDF();
			/** WITH CSS */
			var canvasElement = document.createElement("canvas");
			html2canvas(this.$refs.content, { canvas: canvasElement }).then(
				function(canvas) {
					const img = canvas.toDataURL("image/jpeg", 0.8);
					doc.addImage(img, "JPEG", 20, 20);
					doc.save("sample.pdf");
				}
			);
		},
		download() {
			const doc = new jsPDF();
			/** WITHOUT CSS */
			const contentHtml = this.$refs.content.innerHTML;
			// doc.html(contentHtml, 15, 15, {
			//     width: 170
			//   });
			doc.html(contentHtml, {
				callback: function(doc) {
					doc.save("sample.pdf");
				},
				x: 10,
				y: 10
			});
			// doc.save("sample.pdf");
		}
	}
};
</script>
