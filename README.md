# HivisionIDPhotos-Uniapp

## 预览

<p align="center"><img src="./src/assets/images/app_code_image.jpg"></p>


# <p align="center">《松鼠证件照》</p>
<br>
<br>
<p align="center"><img src="./src/assets/images/app_screenshot.png"></p>
<hr>

## 项目介绍
基于[Zeyi-Lin](https://github.com/Zeyi-Lin)大佬的[HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos)项目为基础，编写的一套生成证件照的微信小程序<br>
这里主要是微信小程序的页面 ，后台还在努力开发中~<br>
目前小程序是直接对接[HivisionIDPhotos](https://github.com/Zeyi-Lin/HivisionIDPhotos)的API,只需运行HivisionIDPhotos后，修改config.ts文件中的接口地址为HivisionIDPhotos的接口地址即可

#### 正在开发的后台主要是实现：
- 微信小程序用户的登录与管理
- 证件照尺寸列表的管理
- 广告激励管理
- 用户图片下载记录
- 会考虑将图片用对象存储的方式存储，用来提升低带宽服务器的访问速率(可能会是七牛云，因为每个月免费10个G，hhh)

#### Tips:
  后台管理将用Golang实现<br>
  目前开发进度70%<br>
  为什么选用Golang？<br>
  Java太占内存了，我的云服务器内存比较小，运行两个Java项目就给内存吃满了<br>
  用Go可以很好的避免这个问题，一个简单的Go项目，内存占用只有不到20m<br>
  目前还是Golang练习生，一边GPT一边写代码，所以后台写的比较慢 2333
## 🤩 主要功能
- #### 人像抠图
- #### 照片换底色
- #### 生成六寸排版照
- #### 自定义证件照尺寸
- #### 保存图片至用户相册

## ⭐ 项目技术栈

- Uniapp
- Vue2
- Vuex
- Typescript
- Uview
#### 为什么不用Vue3?
因为Uview对Vue3的支持不是很好...

## 📦 运行方法

- ### 下载依赖

```
yarn install
```

- ### H5启动

```
yarn serve
```

- ### 微信小程序启动

```
yarn dev:mp-weixin
```

然后项目目录下会生成一个dist目录 <br>
使用微信开发者工具打开dist目录下的 dev/mp-weixin目录 <br>
即可在微信开发者工具中看到该程序 <br>

- ### 发布微信小程序

```
yarn build:mp-weixin
```

该命令会打包符合微信小程序代码规范的极简包
然后以和上面dev版相同方式用微信开发者工具打开项目即可

 ## 📧 联系我
soulerror@qq.com



