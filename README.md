# HivisionIDPhotos-Uniapp

## 预览
![小程序码](http://oss.icuzz.com/beautiful_ID_photo.jpg)
## 项目技术栈
- uniapp
- vue2
- vuex
- typescript
- uview

## 运行方法

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




