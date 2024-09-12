<template>
	<view class="content">
		<Card class="photo-box" @click.native="chooseImage">
			<u-image :src="preview" mode="aspectFit" width="100%" @ckick="chooseImage"></u-image>
			<!-- <u-upload ref="uUpload" accept="image" maxCount="1" :auto-upload="false" name="file" @afterRead="onSelectFile">
			</u-upload> -->
		</Card>
		<u-button @click="submit">提交</u-button>
		<u-button @click="skipTo">提交</u-button>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'


@Component({ components: { Card } })
export default class Index extends Vue {
	banner: Array<string> = [
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
	display: flex;
	flex-direction: column;
	align-items: center;

	.photo-box {
		height: 300rpx;
		margin: 0 auto;
		width: calc(100% - 20rpx);
	}
}
</style>
