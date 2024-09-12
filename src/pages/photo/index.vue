<template>
  <view class="content">
    <!-- 预览遮罩 -->
    <u-overlay :show="show" @click="show = false">
      <u-button type="warning" class="bottom-box-btn" :plain="true" color="#f9ae3d" @click="confirmSelect">确认选择</u-button>
    </u-overlay>
    <div>
      <p>一寸标准证件照</p>
      <p>冲印尺寸:25mm x 35 mm </p>
    </div> 
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
        const path = res.tempFilePaths[0];
        console.log(path);
        this.form.file = path
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
        const path = res.tempFiles[0].tempFilePath
        this.form.file = path
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
    await GeneratePhoto(this.form).then(res => this.preview = res)
      .catch(err => console.log(err))
    this.loading = false
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
