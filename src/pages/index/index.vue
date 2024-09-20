<template>
	<view class="content">
		<div class="banner-box">
			<u-swiper :list="banners" class="banner" height="500rpx"></u-swiper>
		</div>
		<div class="tool-box">
			<div @click="navigateToPhotoSelect(3)" class="size-1-card">
				<u-image src="@/static/example.jpeg" class="example-image" width="171rpx" height="240rpx" radius="10rpx" />
				<div class="size-1-card-desc">一寸照
					<img src="@/static/hot-tag.png" class="hot-tag shake-tag" />
				</div>
			</div>
			<div class="size-other-box">
				<div class="size-2-card" @click="navigateToPhotoSelect(4)">
					<span>二寸照</span>
					<img src="@/static/hot-tag.png" class="hot-tag" />
				</div>
				<div class="size-2-card"><span>自定义尺寸</span> <img src="@/static/new.png" class="hot-tag" /></div>
			</div>
		</div>
		<div class="selection-title">
			<p>热门证件</p>
			<img src="@/static/hot-tag.png" class="hot-tag" />
		</div>
		<div class="photo-box">
			<div :class="'photo-size-list' + ' rank' + index" v-for="(item, index) in data" :key="index"
				@click="navigateToPhotoSelect(item.id)">
				<span>{{ numberCase(index) }}</span>{{ item.name }}
			</div>
		</div>
		<!-- 底部自定义尺寸弹窗 -->
		<u-popup :show="customSize" @close="close" @open="open">
			<view class="size-form-box">
				<u-form>
					<u-form-item label="高度">
						<u-input type="number" placeholder="请输入内容" border="surround"></u-input>
					</u-form-item>
					<u-form-item label="宽度">
						<u-input type="number" placeholder="请输入内容" border="surround"></u-input>
					</u-form-item>
				</u-form>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component } from "vue-property-decorator";
import { photoSizes, PhotoSize, getPhotoSize } from '@/model/PhotoSize'
import { Mutation } from 'vuex-class';

@Component({ components: { Card } })
export default class Index extends Vue {
	banners: Array<string> = [
		'https://cdn.icuzz.com/photo/tiny-banner.png',
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
	// customSize: boolean = true

	//设置vuex
	@Mutation('SET_PHOTO_SIZE') setPhotoSize!: (data: PhotoSize) => void

	//数字转换
	numberCase(index: number): string {
		const num = index + 1
		return num >= 10 ? num.toString() : '0' + num
	}
	/**
	 * 跳转到图片选择页
	 * @param id 图片大小配置的id
	 */
	navigateToPhotoSelect(id: number) {
		const { setPhotoSize, data } = this
		const photoSize = getPhotoSize(id)
		if (photoSize) {
			uni.navigateTo({
				url: '/pages/photo/index?id=' + id,
				success() {
					setPhotoSize(photoSize)
				}
			})
		}
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
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	// background-color: #f2f5f6;
	background-color: #F8F8F8;
	overflow-y: scroll;

	.navigation {
		width: 100%;
		height: 80rpx;
		object-fit: cover;
	}

	.banner-box {
		width: 100%;
		height: 500rpx;
	}

	.banner {
		width: 100% !important;
		height: 500rpx !important;
	}

	.tool-box {
		position: relative;
		top: -60rpx;
		width: calc(100% - (2 * $padding));
		display: flex;
		justify-content: space-between;

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
			font-size: 1rem;
			font-weight: bold;
			display: flex;
			gap: 20rpx;
		}

		.size-2-card {
			width: 100%;
			height: calc(50% - 10rpx);
			padding: $card-padding;
			padding-top: $card-padding + 10rpx;
			box-sizing: border-box;
			border-radius: $card-radius;
			background-color: #fff;
			display: flex;
			gap: 20rpx;
			position: relative;

			span::before {
				content: "";
				display: block;
				height: 8rpx;
				border-radius: 4rpx;
				width: 2rem;
				background-color: red;
				position: absolute;
				left: 20rpx;
				top: 20rpx;
			}
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
			height: 100rpx;
			line-height: 100rpx;
			font-size: 1rem;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			span {
				margin-right: 0.8rem;
				color: #909399;
			}
		}

		.rank0>span {
			color: red;
		}

		.rank1>span {
			color: #e45656;
		}

		.rank2>span {
			color: #f9ae3d;
		}
	}

	.size-form-box {
		padding: 40rpx 60rpx;
		padding-bottom: 0;
	}

	// 热门图标
	.hot-tag {
		height: 20rpx;
		width: 54rpx;
		overflow: hidden;
		border-radius: 6rpx;
	}

	.shake-tag {
		animation: shakeAndPause 1.5s steps(4, end) infinite;
	}

	/* 定义关键帧动画 */
	@keyframes shakeAndPause {

		0%,
		5% {
			transform: rotate(0deg);
		}

		5%,
		10% {
			transform: rotate(6deg);
			/* 改变数值可以调整抖动的距离 */
		}

		10%,
		15% {
			transform: rotate(-6deg);
		}

		15%,
		20% {
			transform: rotate(6deg);
			/* 改变数值可以调整抖动的距离 */
		}

		20%,
		100% {
			transform: rotate(0deg);
		}
	}
}
</style>
