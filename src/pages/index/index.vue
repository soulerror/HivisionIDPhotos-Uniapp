<template>
	<view class="content">
		<div class="banner-box">
			<u-swiper :list="banners" class="banner" height="500rpx"></u-swiper>
		</div>
		<div class="tool-box">
			<div @click="navigateToPhotoSelect(11)" class="size-1-card">
				<u-image src="@/static/example.jpeg" class="example-image" width="171rpx" height="240rpx" radius="10rpx" />
				<div class="size-1-card-desc">一寸照
					<img src="@/static/hot-tag.png" class="hot-tag shake-tag" />
				</div>
			</div>
			<div class="size-other-box">
				<div class="size-2-card" @click="navigateToPhotoSelect(12)">
					<span>二寸照</span>
					<img src="@/static/hot-tag.png" class="hot-tag" />
				</div>
				<div class="size-2-card" @click="openCustomSize(true)"><span>自定义尺寸</span> <img src="@/static/new.png"
						class="hot-tag" /></div>
			</div>
		</div>
		<div class="selection-title">
			<p>热门证件</p>
			<img src="@/static/hot-tag.png" class="hot-tag" />
		</div>
		<div class="photo-box">
			<div :class="'photo-size-list' + ' rank' + index" v-for="(item, index) in hostList" :key="index"
				@click="navigateToPhotoSelect(item.id ? item.id : 1)">
				<span>{{ numberCase(index) }}</span>{{ item.name }}
			</div>
		</div>
		<!-- 底部自定义尺寸弹窗 -->
		<u-popup :show="customSize">
			<view class="size-form-box">
				<u-form label-width="120rpx" label-align="center" :model="customSizeForm" ref="sizeForm">
					<u-form-item label="宽度" prop="width">
						<u-input type="number" v-model="customSizeForm.width" :custom-style="{ width: '400rpx' }"
							placeholder="请输入80-1200之间的数字">
						</u-input>
						<template slot="right">
							<span>px</span>
						</template>
					</u-form-item>
					<u-form-item label="高度" prop="height">
						<u-input type="number" v-model="customSizeForm.height" :custom-style="{ width: '400rpx' }"
							placeholder="请输入80-1200之间的数字"></u-input>
						<template slot="right">
							<span>px</span>
						</template>
					</u-form-item>
					<u-form-item label="尺寸">
						<span slot="right">{{ mmHeight && mmWidth ? `${mmWidth} * ${mmHeight}` : '-' }} mm</span>
					</u-form-item>
					<u-form-item label="分辨率">
						<span slot="right">{{ customSizeForm.dpi }} DPI</span>
					</u-form-item>
				</u-form>

				<div class="size-form-box-btn">
					<u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '20rpx', marginTop: '40rpx' }"
						:plain="true" @click="openCustomSize(false)">取消自定义</u-button>
					<u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '20rpx', marginTop: '40rpx' }"
						@click="goToGenerate">去生成证件照</u-button>
				</div>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component, Ref } from "vue-property-decorator";
import { photoSizes, PhotoSize, getPhotoSize } from '@/model/PhotoSize'
import { Mutation } from 'vuex-class';

//300DPI时的换算系数
const DPICoefficient = 25.4

@Component({ components: { Card } })
export default class Index extends Vue {
	//轮播图
	banners: Array<string> = [
		'https://cdn.icuzz.com/photo/tiny-banner.png',
	]
	//热门照片尺寸
	hostList = photoSizes.slice(0, 10)
	//自定义尺寸弹窗
	customSize: boolean = false

	customSizeForm: AnyObject = {
		height: undefined,
		width: undefined,
		dpi: 300
	}

	@Ref('sizeForm') readonly sizeForm!: HTMLFormElement

	//设置vuex
	@Mutation('SET_PHOTO_SIZE') setPhotoSize!: (data: PhotoSize) => void

	//数字转换
	numberCase(index: number): string {
		const num = index + 1
		return num >= 10 ? num.toString() : '0' + num
	}

	get mmWidth(): number {
		const { customSizeForm } = this
		return Math.round(customSizeForm.width * DPICoefficient / customSizeForm.dpi);
	}

	get mmHeight(): number {
		const { customSizeForm } = this
		return Math.round(customSizeForm.height * DPICoefficient / customSizeForm.dpi);
	}

	/**
	 * 校验规则
	 */
	rules = {
		height: [
			{
				required: true,
				message: "请输入高度",
				trigger: ['change', 'blur'],
			},
			{
				type: 'integer',
				message: "请输入整数",
				trigger: ['change', 'blur'],
			},
			{
				validator: (rule: any, value: any, callback: any) => {
					if (Number(value) >= 80 && Number(value) <= 1200)
						callback()
					else
						callback(new Error())
				},
				message: "高度应该在80-1200px之间",
				trigger: ['change', 'blur'],
			}
		],
		width: [
			{
				required: true,
				message: "请输入宽度",
				trigger: ['change', 'blur'],
			},
			{
				type: 'integer',
				message: "请输入整数",
				trigger: ['change', 'blur'],
			},
			{
				validator: (rule: any, value: any, callback: any) => {
					if (Number(value) >= 80 && Number(value) <= 1200)
						callback()
					else
						callback(new Error())
				},
				message: "宽度应该在80-1200px之间",
				trigger: ['change', 'blur'],
			}
		]
	}

	mounted() {
		this.sizeForm.setRules(this.rules);
	}

	/**
	 * 
	 * @param pxSize 将
	 */
	getMMSize(pxSize: number) {

	}

	openCustomSize(flag: boolean) {
		this.customSize = flag
	}

	goToGenerate() {
		const { mmHeight, mmWidth, customSizeForm: { height, width, dpi }, setPhotoSize } = this

		this.sizeForm.validate((valid: boolean) => {
			if (valid) {

			} else {
				uni.showToast({
					title: "请按照规则填写宽度和高度"
				})
			}
		}).then(() => {
			const photoSize: PhotoSize = {
				name:"自定义尺寸",
				pxHeight: height,
				pxWidth: width,
				mmHeight: mmHeight,
				mmWidth: mmWidth,
				dpi: dpi
			}
			uni.navigateTo({
				url: '/pages/photo/index',
				success() {
					setPhotoSize(photoSize)
				}
			})
		}).catch((error: any) => {
			uni.showToast({
				title: error[0].message
			})
		})
	}
	/**
	 * 跳转到图片选择页
	 * @param id 图片大小配置的id
	 */
	navigateToPhotoSelect(id: number) {
		const { setPhotoSize } = this
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
		height: 500rpx;
		padding: 40rpx 80rpx;
		// padding-top: 80rpx;

		.size-form-box-btn {
			display: flex;
		}
	}

	// 热门图标
	.hot-tag {
		height: 20rpx;
		width: 54rpx;
		overflow: hidden;
		border-radius: 6rpx;
	}
}
</style>
