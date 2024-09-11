<template>
	<view class="content">
		<u-swiper :list="banner"></u-swiper>
		<Card class="photo-box" />
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component, Emit, Prop, Watch } from "vue-property-decorator";



@Component({ components: { Card } })
export default class Index extends Vue {
	banner: Array<string> = [
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	]
}
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #3303;

	.photo-box {
		height: 300rpx;
		margin: 0 auto;
		width: calc(100% - 20rpx);
	}
}
</style>
