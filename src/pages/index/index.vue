<template>
	<view class="content">
		<div class="banner-box">
			<u-swiper :list="banners" class="banner"></u-swiper>
		</div>
		<div class="tool-box">
			<div @click="skipTo" class="size-1-card">
				<u-image src="https://icuzz-media.oss-cn-chengdu.aliyuncs.com/photo/image.jpeg" class="example-image"
					width="80px" height="100px" />
				<p>一寸照</p>
			</div>
			<div class="size-other-box">
				<div class="size-2-card">二寸照</div>
				<div class="size-2-card">更多尺寸</div>
			</div>
		</div>
		<div class="photo-box" @click="chooseImage">
			<div>一寸照</div>
			<div>一寸照</div>
			<div>一寸照</div>
			<div>一寸照</div>
			<div>一寸照</div>
		</div>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'


@Component({ components: { Card } })
export default class Index extends Vue {
	banners: Array<string> = [
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	]
	form: AnyObject = {
		height: 413,
		width: 295,
		human_matting_model: "hivision_modnet",
		face_detect_model: "mtcnn",
		hd: false,
		file: ''
	}

	preview: string = ''
	/**
	 * 选择图片
	 */
	chooseImage() {
		uni.chooseImage({
			count: 1,
			success: (res) => {
				this.form.file = res.tempFilePaths[0];
				console.log(this.form.file);
				// 获取选择的文件路径
			}
		});
	}
	/**
	 * 提交表单
	 */
	submit() {
		GeneratePhoto(this.form).then(res => this.preview = res)
	}
	/**
	 * 选择图片
	 * @param event 
	 */
	onSelectFile(event: any) {
		console.log("file", event.file.url);
		this.form.file = event.file.url
	}
	skipTo() {
		uni.navigateTo({
			url: '/pages/photo/index'
		})
	}
}
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f2f5f6;


	.banner-box {
		width: 100%;
		height: 300rpx;
	}

	.banner {
		width: 100% !important;
		height: 300rpx;
	}

	.tool-box {
		position: relative;
		top: -60rpx;
		width: calc(100% - 80rpx);
		display: flex;
		justify-content: space-between;

		.size-1-card {
			height: 300rpx;
			width: 280rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background-color: #fff;


			.example-image {
				width: 100rpx;
				height: 160rpx;
			}
		}

		.size-other-box {
			height: 300rpx;
			width: 360rpx;
			display: flex;
			flex-direction: column;
			gap: 40rpx;
		}

		.size-2-card {
			width: 100%;
			height: 130rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background-color: #fff;
		}
	}

	.photo-box {
		height: 300rpx;
		margin: 10rpx auto;
		width: calc(100% - 80rpx);
	}
}
</style>
