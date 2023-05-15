<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			};
		},
		onLoad(params){
			let links = decodeURIComponent("http://112.74.42.19:8047/upload/PDFCheckResult/1632376874869-3930.pdf");
			this.url = `/hybrid/html/pdf.html?url=${links}`;
			// let {url} = params
			// this.url = `/hybrid/html/pdf.html?url=${url}`
		},
		onBackPress(){}
	}
</script>

<style>
</style>
