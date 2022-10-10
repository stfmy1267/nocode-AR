import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import viteImagemin from 'vite-plugin-imagemin'; // 追加
// https://vitejs.dev/config/

export default defineConfig({
  // base:'/gitbucket/Fumiya238/nocode-AR/pages/', GitBucket用
  // base:'/nocode-AR/', //GitHub用
  build: {
    outDir: '../server/public/',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'rally.html')
      }
    }
  },
  server: {
    port: 8888,
    proxy: 'http://localhost:3000'
  },
  // pages:{
  //   top: {
  //     entry: 'src/top/main.js', // エントリーポイントとなるjs
  //     template: 'index.html', // テンプレートのHTML
  //     filename: 'index.html', // build時に出力されるファイル名
  //   },
  //   users: {
  //     entry: 'src/main.js',
  //     template: 'home.html',
  //     filename: 'home.html',
  //   },
  // },
  plugins: [vue()]
  //   // 画像圧縮
  //   viteImagemin({
  //     gifsicle: {
  //       optimizationLevel: 7,
  //       interlaced: false,
  //     },
  //     optipng: {
  //       optimizationLevel: 7,
  //     },
  //     mozjpeg: {
  //       quality: 20,
  //     },
  //     pngquant: {
  //       quality: [0.8, 0.9],
  //       speed: 4,
  //     },
  //     svgo: {
  //       plugins: [
  //         {
  //           name: 'removeViewBox',
  //         },
  //         {
  //           name: 'removeEmptyAttrs',
  //           active: false,
  //         },
  //       ],
  //     },
  //   }),
})
