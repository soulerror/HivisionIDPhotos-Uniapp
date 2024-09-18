<template>
  <div class="photo-edit">
    <div class="preivew-box"
      :style="{ 'height': imageHeight, 'width': imageWidth, 'background-color': backgroundColor }">
      <u-image class="photo" :src="transparentBase64" :style="{ 'background-color': backgroundColor }" mode="aspectFit"
        :width="imageWidth" :height="imageHeight" />
      <!-- <image :src="transparentBase64" class="preview-photo" :style="{ 'background-color': backgroundColor }" /> -->
    </div>
    <p>颜色:</p>
    <div class="color-list">
      <ColorDot class="color-list-item" borderColor="#DCDFE6" @click="changeBackgroudColor('')"> <u-icon name="close"
          size="40rpx" /></ColorDot>
      <div class="color-list-item" v-for="color in colors" :style="{ 'backgroundColor': color }"
        :borderColor="color == '#FFFFFF' ? '#DCDFE6' : ''" :key="color" :color="color"
        @click="changeBackgroudColor(color)"></div>
    </div>
    <div>
      <u-switch></u-switch>
    </div>
    <div class="bottom-box">
      <u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '10rpx' }"
        :plain="true">保存冲印照片</u-button>
      <u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '10rpx' }"
        @click="savePhotoToAlbum">保存证件照片</u-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import { GeneratePhoto, AddBackgroudColor } from '@/api/photo'
import Card from '@/components/Card.vue'
import ColorDot from '@/components/ColorDot.vue'
import { Colors } from '@/model/Colors'
//标准宽度
const standard_width = 600;

@Component({ components: { Card, ColorDot } })
export default class PhotoEdit extends Vue {
  colors = { ...Colors }
  form: AnyObject = {
    height: 413,
    width: 295,
    human_matting_model: "hivision_modnet",
    face_detect_model: "mtcnn",
    hd: false,
    file: ''
  }
  //图片背景色
  backgroundColor: string = '#ffffff'
  //抠图之后的透明底色的base64照片
  transparentBase64: string = ''
  //本地图片的地址
  transparentBase64Path: string = ''

  /**
   * 计算照片高度
   */
  get imageHeight() {
    const { height, width } = this.form
    if (height > width) {
      return standard_width + 'rpx'
    }
    else {
      return (standard_width / width * height) + 'rpx';
    }
  }

  /**
   * 页面加载时初始化
   */
  created() {
    this.transparentBase64 = uni.getStorageSync("photo:transparentBase64")
    this.transparentBase64Path = uni.getStorageSync("photo:transparentBase64:path")
  }

  /**
   * 计算照片宽度
   * 最宽500px
   */
  get imageWidth() {
    const { width, height } = this.form
    if (width > height) {
      return standard_width + 'rpx'
    }
    else {
      return (standard_width / height * width) + 'rpx';
    }
  }
  /**
   * 修改图片颜色
   * @param color 颜色
   */
  changeBackgroudColor(color: string) {
    this.backgroundColor = color
  }
  /**
   * 保存图片到相册
   */
  async savePhotoToAlbum() {
    const colorBase64 = await AddBackgroudColor({ color: this.backgroundColor.replace('#', '') }, 'input_image', this.transparentBase64Path).then(res => res['image_base64'])
    console.log(colorBase64);
    if (colorBase64 === undefined) {
      return
    }
    //查看用户是否授权保存相册
    uni.authorize({
      scope: 'scope.writePhotosAlbum',
      success() {
        uni.getImageInfo({
          src: colorBase64,
          success(imageInfo) {
            uni.saveImageToPhotosAlbum({
              filePath: imageInfo.path,
              success() {
                uni.showModal({
                  title: "保存成功",
                  showCancel: false,
                });
              },
              fail() {
                uni.showModal({
                  title: "保存失败",
                  content: `保存发生了异常,保存失败了哦~`,
                  showCancel: false,
                });
              }
            })
          }
        })
      },
      fail() {
        uni.showModal({
          title: "保存失败",
          content: `用户未授权相册权限,保存失败了哦~`,
          showCancel: false,
        });
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.photo-edit {
  height: 100%;
  padding: 0 40rpx;
}

.preivew-box {
  display: flex;
  justify-content: center;
  margin: 0 auto;

  .preview-photo {
    width: 750rpx;
    height: auto;
    border: 1px solid #DCDFE6;
  }
}

.bottom-box {
  //减去父元素的padding
  width: calc(100% - 40rpx);
  position: absolute;
  bottom: 100rpx;
  display: flex;
  justify-content: space-around;
}

.color-list {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  gap: 30rpx;
  height: 120rpx;

  &-item {
    height: 60rpx;
    width: 60rpx;
    border: 1px solid #DCDFE6;
    border-radius: 8rpx;
  }

  &-item:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }
}
</style>
