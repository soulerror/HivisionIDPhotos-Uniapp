<template>
  <div class="photo-edit">
    <div class="preview-box">
      <div class="photo-box"
        :style="{ 'height': imageHeight, 'width': imageWidth, 'background-color': IDPhotoForm.color }">
        <u-image class="photo" :src="isHd ? photoPath.base64HD : photoPath.base64" mode="aspectFit" :width="imageWidth"
          :height="imageHeight" />
      </div>
    </div>
    <br />
    <div class="selection-card">
      <p>颜色</p>
      <div class="color-list">
        <div class="color-list-item" v-for="color in colors" :style="{ 'backgroundColor': color }"
          :borderColor="color == '#FFFFFF' ? '#DCDFE6' : ''" :key="color" :color="color"
          @click="changeBackgroudColor(color)"></div>
      </div>
    </div>

    <u-form>
      <u-form-item label="是否高清" label-width="80">
        <u-switch v-model="isHd" activeColor="#F77261"></u-switch>
      </u-form-item>
    </u-form>
    <div class="selection-card selection-gap">

      <!-- <p>是否高清</p> -->

    </div>
    <div class="bottom-box">
      <u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '10rpx' }" :plain="true"
        @click="generateLayoutPhoto">保存冲印照片</u-button>
      <u-button color="#F77261" :custom-style="{ width: '240rpx', borderRadius: '10rpx' }"
        @click="generateIDPhoto">保存证件照片</u-button>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import { AddBackgroudColor, GenerateLayoutPhoto } from '@/api/photo'
import LengthLine from '@/components/LengthLine.vue'
import ColorDot from '@/components/ColorDot.vue'
import { Colors } from '@/model/Colors'
import { Getter } from 'vuex-class';
import { PhotoSize } from '@/model/PhotoSize';
import { cloneDeep } from 'lodash'
import { PhotoPath } from '@/model/Interfaces'

//标准宽度
const standard_width = 700;
//图片前缀
const prefix = 'data:image/png;base64,'

@Component({ components: { LengthLine, ColorDot } })
export default class PhotoEdit extends Vue {
  colors = { ...Colors }
  //换底证件照参数
  IDPhotoForm: AnyObject = {
    color: Colors[0],
    kb: undefined,
    render: 0
  }
  //图片背景色
  backgroundColor: string = ''
  //是否高清
  isHd: boolean = true
  //证件照文件临时地址
  idPhotoTempPath: string = ''
  //排版照文件临时地址
  layoutPhotoTempPath: string = ''

  //vuex中的图片大小信息
  @Getter('photoConfig') photoSize!: PhotoSize
  //vuex中存储的图片地址
  @Getter('photoPath') photoPath!: PhotoPath
  /**
   * 计算照片高度
   */
  get imageHeight() {
    const { pxHeight, pxWidth } = this.photoSize
    if (Number(pxHeight) > Number(pxWidth)) {
      return standard_width + 'rpx'
    }
    else {
      return (standard_width / pxWidth * pxHeight) + 'rpx';
    }
  }

  /**
   * 计算照片宽度
   * 最宽500px
   */
  get imageWidth() {
    const { pxHeight, pxWidth } = this.photoSize
    if (Number(pxWidth) > Number(pxHeight)) {
      console.log(standard_width);
      return standard_width + 'rpx'
    }
    else {
      return (standard_width / pxHeight * pxWidth) + 'rpx';
    }
  }
  /**
   * 页面加载时初始化
   */
  created() {
  }

  /**
   * 修改图片颜色
   * @param color 颜色
   */
  changeBackgroudColor(color: string) {
    this.IDPhotoForm.color = color
  }
  /**
   * 生成换底证件照
   */
  async generateIDPhoto() {
    uni.showLoading({
      title: '正在处理中...'
    });
    const { photoPath: photo, IDPhotoForm, isHd } = this
    const that = this
    if (IDPhotoForm.kb === undefined) {
      delete IDPhotoForm.kb
    }
    //拷贝一下
    const form = cloneDeep(IDPhotoForm)
    //去掉颜色的前缀
    form.color = form.color.replace('#', '')
    await AddBackgroudColor(IDPhotoForm, 'input_image', isHd ? photo.base64Path : photo.base64HDPath)
      .then((res) => {
        const colorBase64 = res['image_base64']
        if (colorBase64 === undefined) {
          return
        }
        const saveData = colorBase64.replace(prefix, '')
        //临时文件地址
        const tempPath = `${wx.env.USER_DATA_PATH}/${Date.now()}.png`;
        const fs = uni.getFileSystemManager()
        fs.writeFile({
          filePath: tempPath,
          data: saveData,
          encoding: 'base64',
          success() {
            that.savePhotoToAlbum(tempPath)
          }, fail(err) {
            console.error("暂存文件到本地发生异常", err);
            uni.showModal({
              title: "保存失败",
              content: `保存发生了异常,保存失败了哦~`
            });
          }
        })
      }).catch((err) => {
        console.error("获取带背景色图片网络请求异常", err);
        uni.showModal({
          title: "保存失败",
          content: `保存发生了异常,保存失败了哦~`,
          showCancel: false,
        });
      })
    uni.hideLoading()
  }

  /**
 * 生成六寸排版照
 */
  async generateLayoutPhoto() {
    uni.showLoading({
      title: '正在处理中...'
    });
    //先生成带底色证件照
    const that = this
    const { photoSize, IDPhotoForm, isHd, photoPath: photo } = this
    const layoutPhotoForm = {
      height: photoSize.pxHeight,
      width: photoSize.pxWidth,
      kb: IDPhotoForm.kb
    }

    if (IDPhotoForm.kb === undefined) {
      delete IDPhotoForm.kb
      delete layoutPhotoForm.kb
    }
    //拷贝一下
    const idFormCopy = cloneDeep(IDPhotoForm)
    //去掉颜色的前缀
    idFormCopy.color = idFormCopy.color.replace('#', '')
    //根据选择查看是否生成高清图
    const targetBase64 = isHd ? photo.base64Path : photo.base64HDPath
    //获取带背景色的图
    const { image_base64: colorBase64 } = await AddBackgroudColor(idFormCopy, 'input_image', targetBase64)
    const handledColorBase64 = colorBase64.replace(prefix, "")
    //指定路径缓存
    const tempColorImagePath = `${wx.env.USER_DATA_PATH}/temp_color_image.png`;
    const fs = uni.getFileSystemManager()
    //将换底色图片写入本地临时目录
    fs.writeFile({
      filePath: tempColorImagePath,
      data: handledColorBase64,
      encoding: 'base64',
      success() {
        //请求生成排版照
        GenerateLayoutPhoto(layoutPhotoForm, 'input_image', tempColorImagePath)
          .then((res) => {
            const layoutBase64 = res['image_base64']
            if (layoutBase64 === undefined) {
              return
            }
            const saveData = layoutBase64.replace(prefix, '')
            //临时文件地址
            const tempPath = `${wx.env.USER_DATA_PATH}/image${Date.now()}.png`;
            const fs = uni.getFileSystemManager()
            fs.writeFile({
              filePath: tempPath,
              data: saveData,
              encoding: 'base64',
              success() {
                that.savePhotoToAlbum(tempPath)
              }, fail(err) {
                console.error("暂存文件到本地发生异常", err);
                uni.showModal({
                  title: "保存失败",
                  content: `保存发生了异常,保存失败了哦~`
                });
              }
            })
          }).catch((err) => {
            console.error("获取带背景色图片网络请求异常", err);
            uni.showModal({
              title: "保存失败",
              content: `保存发生了异常,保存失败了哦~`,
              showCancel: false,
            });
          })
      }
    })
  }
  /**
   * 保存图片到相册
   */
  async savePhotoToAlbum(tempPath: string) {
    //查看用户是否授权保存相册
    // #ifndef MP-WEXIN
    uni.authorize({
      scope: 'scope.writePhotosAlbum',
      success() {
        uni.showLoading({
          title: '加载中'
        });
        // #endif
        //保存临时文件到相册
        uni.saveImageToPhotosAlbum({
          filePath: tempPath,
          success() {
            uni.showToast({
              title: "保存成功",
              content: `图片已保存成功,快去相册看看吧~`,
              duration: 5000
            });
          },
          fail(err) {
            const { errMsg } = err
            if (errMsg === 'saveImageToPhotosAlbum:fail cancel') {
              uni.showToast({
                title: "保存失败",
                content: `您取消了保存到相册哦~`
              });
            }
            else {
              console.error("保存文件时发生异常", err);
              uni.showModal({
                title: "保存失败",
                content: `保存发生了异常,保存失败了哦~`
              });
            }
          }
        })
        // #ifndef MP-WEXIN
      },
      fail() {
        uni.showModal({
          title: "保存失败",
          content: `用户未授权相册权限,保存失败了哦~`,
          showCancel: false,
        });
      },
      complete() {
        uni.hideLoading()
      }
    })
    // #endif
  }
}
</script>
<style lang="scss" scoped>
.photo-edit {
  height: 100%;
  padding: 0 40rpx;
}

.selection-card {
  padding: 20rpx 0;

}

.selection-gap {
  p {
    margin-bottom: 30rpx;
  }
}

.preview-box {
  height: 700rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .photo-box {
    display: flex;
    justify-content: center;

    .preview-photo {
      width: 750rpx;
      height: auto;
      border: 1px solid #DCDFE6;
    }
  }
}


.bottom-box {
  //减去父元素的padding
  width: calc(100% - (2 * $page-padding));
  position: absolute;
  bottom: 100rpx;
  display: flex;
  justify-content: space-around;
}

.color-list {
  display: flex;
  align-items: center;
  line-height: 120rpx;
  gap: 30rpx;
  height: 120rpx;
  flex-wrap: wrap;
  margin-top: 40rpx;
  margin-bottom: 60rpx;

  &-item {
    height: 60rpx;
    width: 60rpx;
    border: 1px solid #DCDFE6;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-item:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }
}
</style>
