import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//  https://vitejs.dev/config/
export default defineConfig({
  publicPath:'/weather/',
  transpileDependencies: true,
  plugins: [vue()],
  base: './',
})

// const {defineConfig} = require('@vue/cli-service')
// module.exports = defineConfig({
//   publicPath:'/weather/',
//   transpileDependencies: true
// });