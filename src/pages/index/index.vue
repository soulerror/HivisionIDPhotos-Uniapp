<template>
	<view class="content">
		<div class="banner-box">
			<u-swiper :list="banners" class="banner"></u-swiper>
		</div>
		<div class="tool-box">
			<div @click="skipTo" class="size-1-card">
				<u-image src="https://cdn.icuzz.com/photo/example.jpeg" class="example-image" width="171rpx" height="240rpx"
					radius="10rpx" />
				<div class="size-1-card-desc">一寸照
					<div class="hot-tag" />
				</div>
			</div>
			<div class="size-other-box">
				<div class="size-2-card">二寸照
					<div class="hot-tag" />
				</div>
				<div class="size-2-card">更多尺寸</div>
			</div>
		</div>
		<div class="selection-title">
			<p>热门证件</p>
			<div class="hot-tag" />
		</div>
		<div class="photo-box">
			<div class="photo-size-list" v-for="(item, index) in data" :key="index">{{ item.name }}</div>
		</div>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'
import { photoSizes } from '@/enums/PhotoSize'

@Component({ components: { Card } })
export default class Index extends Vue {
	banners: Array<string> = [
		'https://cdn.icuzz.com/photo/banner3.png',
	]
	form: AnyObject = {
		height: 413,
		width: 295,
		human_matting_model: "hivision_modnet",
		face_detect_model: "mtcnn",
		hd: false,
		file: ''
	}
	data = photoSizes
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
	 * 页面加载调用
	 */
	mounted() {
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
//首页卡片高度
$card-height: 360rpx;

$padding: 40rpx;

//卡片圆角
$card-radius: 20rpx;

$card-padding: 30rpx;

.content {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f2f5f6;
	overflow: hidden;


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
		top: -80rpx;
		width: calc(100% - (2 * $padding));
		display: flex;
		justify-content: space-between;

		.card-tag {
			display: block;
			width: 80rpx;
			height: 36rpx;
			line-height: 36rpx;
			border-radius: 6rpx;
			font-size: 24rpx;
			font-weight: normal;
			color: rgb(245, 108, 108);
			text-align: center;
			border: 1px solid rgb(245, 108, 108);
			background-color: rgba(245, 108, 108, 0.1);
		}

		//#f4352f

		.size-1-card {
			height: $card-height;
			width: 280rpx;
			padding: $card-padding;
			box-sizing: border-box;
			border-radius: $card-radius;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			gap: 30rpx;

			&-desc {
				font-size: 1.2rem;
				font-weight: bold;
				display: flex;
				gap: 20rpx;
			}
		}



		.size-other-box {
			height: $card-height;
			width: 360rpx;
			display: flex;
			flex-direction: column;
			gap: 40rpx;
			font-size: 0.8rem;
			font-weight: bold;
			display: flex;
			gap: 20rpx;
		}

		.size-2-card {
			width: 100%;
			height: calc(50% - 10rpx);
			padding: $card-padding;
			box-sizing: border-box;
			border-radius: $card-radius;
			background-color: #fff;
			display: flex;
			gap: 20rpx;
		}
	}

	.selection-title {
		width: 100%;
		padding: 0 $padding;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		align-items: center;
		gap: 20rpx;

		p {
			text-align: left;
			font-weight: bold;
		}
	}

	.photo-box {
		margin: 10rpx auto;
		width: calc(100% - (2 * $padding));
		background-color: #fff;
		border-radius: $card-radius;
		padding: $card-padding;
		display: flex;
		flex-wrap: wrap;

		.photo-size-list {
			width: 50%;
			height: 60rpx;
			font-size: 24rpx;
			font-weight: bold;
		}
	}

	// 热门图标
	.hot-tag {
		height: 20rpx;
		width: 54rpx;
		overflow: hidden;
		background-size: contain;
		border-radius: 6rpx;
		background-repeat: no-repeat;
		background-image: url('https://cdn.icuzz.com/photo/hot-tag.png');
		background-position: center;
	}



}
</style>
