<template>
    <div class="mine-page">
        <div class="banner">
            <image src="https://cdn.icuzz.com/photo/example.jpeg" class="avatar" mode="aspectFill" size="60rpx" />
            <p>欢迎使用最美AI证件照</p>
        </div>
        <div class="card card-common">
            <p>正在拼命开发中...</p>
        </div>
        <div class="setting-card card-common">
            <u-cell-group :border="false">
                <u-cell icon="setting-fill" title="个人设置" />
                <u-cell icon="question-circle" title="常见问题" isLink />
                <u-cell icon="account" title="关于我们" isLink />
                <u-cell icon="server-man" title="联系客服" />
                <u-cell icon="share-square" title="分享小程序" />
            </u-cell-group>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
@Component({})
export default class Index extends Vue {

}
</script>
<style lang="scss">
.mine-page {
    height: 100%;
    background-color: #F8F8F8;

    //头部banner背景图
    .banner {
        height: 400rpx;
        padding: 0 60rpx;
        padding-top: 60rpx;
        background-color: #f9ebe7;
        background-image: linear-gradient(#F77261, #f9ebe7);
        display: flex;
        line-height: 100rpx;
        align-items: center;
        gap: 40rpx;
        border-radius: 0 0 20rpx 20rpx;

        &>p:first-of-type {
            font-size: 32rpx;
            font-weight: bold;
        }

        .avatar{
            height: 140rpx;
            width: 140rpx;
            border-radius: 50%;
        }
    }

    // 卡片公共样式 
    .card-common {
        width: calc(100% - (2 * $page-padding));
        margin: 0 auto;
        background-color: #fff;
        border-radius: 20rpx;
        padding: 20rpx;
    }

    .card {
        height: 200rpx;
        position: relative;
        top: -60rpx;

        &>p:first-of-type {
            color: #909399;
        }
    }

    .setting-card {
        padding-bottom: 60rpx;
    }


}
</style>