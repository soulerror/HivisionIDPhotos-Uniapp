<template>
  <div class="photo-edit">
    <div class="preivew-box">
      <u-image class="photo" :src="orginPhotoUrl" :style="{ 'background-color': backgroundColor }" mode="aspectFit"
        :height="form.height" :width="form.width" />
    </div>
    <div class="color-list">
      <span>颜色:</span>
      <ColorDot class="color-list-item" borderColor="#DCDFE6" @click="changeBackgroudColor('')"> <u-icon name="close"
          size="40rpx" /></u-icon></ColorDot>
      <ColorDot class="color-list-item" v-for="color in colors" :borderColor="color == '#FFFFFF' ? '#DCDFE6' : ''"
        :key="color" :color="color" @click="changeBackgroudColor(color)"></ColorDot>
    </div>
    <div>
      <u-switch></u-switch>
    </div>
    <div class="bottom-box">
      <u-button type="warning" :custom-style="{ width: '240rpx', borderRadius: '10rpx' }" :plain="true"
        color="#f9ae3d">保存标清照片</u-button>
      <u-button type="warning" :custom-style="{ width: '240rpx', borderRadius: '10rpx' }" :plain="true"
        color="#f9ae3d">保存高清照片</u-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'
import Card from '@/components/Card.vue'
import ColorDot from '@/components/ColorDot.vue'
import { Colors } from '@/model/Colors'

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
  backgroundColor: string = '#fff'
  orginPhotoUrl: string = ''
  preview: string | undefined = undefined
  mounted(options: any) {
    this.orginPhotoUrl = uni.getStorageSync("photo-url")
  }
  onShow(options: any) {
  }
  /**
 * 提交表单
 */
  submit() {
    GeneratePhoto(this.form).then(url => this.preview = url)
  }
  changeBackgroudColor(color: string) {
    console.log(color);
    this.backgroundColor = color
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
  }
}
</style>
