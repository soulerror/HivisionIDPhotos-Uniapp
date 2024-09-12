<template>
  <view class="content">
    <!-- 预览遮罩 -->
    <u-overlay :show="show" @click="show = false">
      <u-image :src="this.preview" mode="aspectFit" width="100%"></u-image>
      <u-button type="warning" class="bottom-box-btn" :plain="true" color="#f9ae3d"
        @click="confirmSelect">确认选择</u-button>
    </u-overlay>

    <Card class="photo-box" @click.native="chooseImage">
      <u-image :src="this.preview" mode="aspectFit" width="100%"></u-image>
    </Card>
    <!-- 照片选择 -->
    <div class="bottom-box">
      <u-button type="warning" class="bottom-box-btn" :plain="true" color="#f9ae3d"
        @click="chooseImage('album')">去相册选择</u-button>
      <u-button type="warning" class="bottom-box-btn" @click="chooseImage('camera')">去拍照</u-button>
    </div>
    <!-- 加载页 -->
    <u-loading-page :loading="loading"></u-loading-page>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'

@Component({ components: { Card } })
export default class PhotoIndex extends Vue {
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
  //图片预览遮罩
  show: boolean = false
  //加载动画
  loading: boolean = false


  /**
   * 选择图片
   */
  chooseImage(type: 'album' | 'camera') {

    // #ifdef H5
    uni.chooseImage({
      count: 1,
      sourceType: [type],
      success: (res) => {
        this.preview = res.tempFilePaths[0];
        // 获取选择的文件路径
        this.show = true
      }
    });
    // #endif

    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: [type],
      success: (res) => {
        this.form.file = res.tempFiles[0];
        this.preview = res.tempFiles[0].tempFilePath
        this.show = true
      }
    });
    // #endif
  }
  /**
   * 提交表单
   */
  submit() {

  }
  /**
   * 确认选择
   */
  async confirmSelect() {
    this.loading = true
    await GeneratePhoto(this.form).then(res => this.preview = res).catch(err => console.log(err)).finally(() => this.loading = false)
    uni.setStorageSync('photo-url', this.preview)
    uni.navigateTo({
      url: '/pages/photo/edit'
    })
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

  .bottom-box {
    height: 100rpx;
    display: flex;
    gap: 40rpx;
    white-space: nowrap;

    &-btn {
      border-radius: 20rpx;
      width: 240rpx;
    }
  }
}
</style>
