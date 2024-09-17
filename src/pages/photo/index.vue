<template>
  <view class="photo-select">
    <!-- 预览遮罩 -->
    <u-overlay :show="show" @click="show = false">
      <div class="preview-box">
        <u-image :src="form.file" mode="aspectFit" height="1000rpx" radius="10rpx"></u-image>
      </div>
      <u-button color="#F77261" class="bottom-box-btn" :custom-style="{ width: '240rpx', borderRadius: '20rpx' }"
     @click="confirmSelect">确认选择</u-button>
    </u-overlay>
    <div class="photo-select-box">
      <div class="photo-select-box-title">{{ photoSize.name }}</div>
      <div class="photo-select-box-desc">
        <div>
          <p>{{ photoSize.mmWidth }} x {{ photoSize.mmHeight }} mm</p>
          <p>冲印尺寸</p>
        </div>
        <div>
          <p>{{ photoSize.pxWidth }} x {{ photoSize.pxHeight }} px</p>
          <p>像素大小</p>
        </div>
        <div>
          <p>
            {{ photoSize.dpi }} DPI
          </p>
          <p>分辨率</p>
        </div>
      </div>
      <div class="photo-select-card">
        <div>支持保存电子照 <u-icon name="checkmark-circle-fill" color="#5ac725" /></div>
        <div>支持保存电子排版照 <u-icon name="checkmark-circle-fill" color="#5ac725" /></div>
        <div>背景色
          <div class="color-dot-box">
            <ColorDot color="#D9001B" class="color-dot" />
            <ColorDot color="#02A7F0" class="color-dot" />
            <ColorDot color="#FFFFFF" class="color-dot" />
            <ColorDot color="#3492C4" class="color-dot" />
            <ColorDot color="#3D99E2" class="color-dot" />
          </div>
        </div>
        <div>文件大小 <span>KB</span></div>
        <div>文件格式 <span>JPG</span></div>
      </div>
      <div>拍照建议</div>
      <div class="photo-select-card">
        <div>1.放松身体，挺胸抬头，两眼平视前方</div>
        <div>2.去掉发饰、眼镜，露出耳朵</div>
        <div>3.着深色衣服，在白色背景墙前成像效果最佳</div>
      </div>
    </div>
    <!-- 照片选择 -->
    <div class="bottom-box">
      <u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '20rpx' }" :plain="true" text="去相册选择" @click="chooseImage('album')"></u-button>
      <u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '20rpx' }"
        @click="chooseImage('camera')">去拍照</u-button>
    </div>
    <!-- 加载页 -->
    <u-loading-page :loading="loading" loading-text="正在生成中..." bg-color="#fff" />
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue'
import ColorDot from '@/components/ColorDot.vue'
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'
import { photoSizes, PhotoSize } from '@/enums/PhotoSize'

@Component({ components: { Card, ColorDot } })
export default class PhotoIndex extends Vue {
  form: AnyObject = {
    height: 413,
    width: 295,
    human_matting_model: "hivision_modnet",
    face_detect_model: "mtcnn",
    hd: false,
    file: ''
  }
  photoSize: PhotoSize = photoSizes[0]
  preview: string = ''
  //图片预览遮罩
  show: boolean = false
  //加载动画
  loading: boolean = false

  mounted() {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1];
    const photoSize = photoSizes.find(item => item.id == page.$vm.$mp.query.id)
    this.photoSize = photoSize ? photoSize : this.photoSize
  }
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
    uni.setStorageSync('photo-url', this.preview)

    uni.navigateTo({
      url: '/pages/photo/edit',
      success: () => {
        this.loading = false
      }
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
$page-padding: 20rpx;

.photo-select {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40rpx;
  background-color: #fff;

  &-box {
    height: calc(100% - 150rpx);
    overflow: hidden;
    overflow-y: scroll;


    &-title {
      width: 100%;
      border-bottom: 1px solid #DCDFE6;
      line-height: 120rpx;
      font-size: 50rpx;
      font-weight: bold;
    }

    &-desc {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 20px;
      padding: 10rpx 0;

      div {
        width: 33.3%;
        text-align: center;
        border-left: 1px solid #DCDFE6;
        line-height: 30rpx;

        &>p:first-child {
          font-weight: bold;
          font-size: 0.8rem;
        }

        &>p:last-child {
          color: #909399;
        }
      }

      &>div:first-child {
        border: none;
      }
    }
  }


  &-card {
    margin: 20rpx 0 40rpx 0;
    padding: 60rpx 40rpx;
    border-radius: 16rpx;
    // background-color: #fff;
    background-color: #F8F8F8;
    color: #909399;
    display: flex;
    flex-direction: column;
    gap: 40rpx;

    div {
      display: flex;
      justify-content: space-between;
    }


    .color-dot {
      height: 30rpx;
      width: 30rpx;
      margin: 0 6rpx;
    }
  }

  .photo-box {
    height: 300rpx;
    margin: 0 auto;
    width: calc(100% - 20rpx);
  }

  .bottom-box {
    height: 140rpx;
    display: flex;
    gap: 40rpx;
    white-space: nowrap;
    // border-top: 1px solid $theme-color;
    padding: 20rpx 0;
    box-sizing: border-box;
  }

  .preview-box {
    height: calc(100% - 200rpx);
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
}
</style>
