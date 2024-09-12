<template>
  <div>
    <u-image :src="orginPhotoUrl" />
    <u-button type="warning">一键生成</u-button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import { GeneratePhoto } from '@/api/photo'
import Card from '@/components/Card.vue'

@Component({ components: { Card } })
export default class PhotoEdit extends Vue {
  form: AnyObject = {
    height: 413,
    width: 295,
    human_matting_model: "hivision_modnet",
    face_detect_model: "mtcnn",
    hd: false,
    file: ''
  }
  orginPhotoUrl: string = ''
  preview: string | undefined = undefined
  mounted(options: any) {
    this.orginPhotoUrl = uni.getStorageSync("photo-url")
  }
  onShow(options: any) {
    console.log(111111111);
  }
  /**
 * 提交表单
 */
  submit() {
    GeneratePhoto(this.form).then(url => this.preview = url)
  }
}
</script>
