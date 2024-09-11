const { defineConfig } = require('@vue/cli-service')
const path = require('node:path')

// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['uview-ui']
}
