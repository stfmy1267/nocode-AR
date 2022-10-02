import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import viteImagemin from 'vite-plugin-imagemin'; // 追加
// https://vitejs.dev/config/

export default defineConfig({
  // base:'/gitbucket/Fumiya238/nocode-AR/pages/', GitBucket用
  // base:'/nocode-AR/', //GitHub用
  build: {
  outDir: '../server/public/',
  },
  server: {
    port: 8888
  },
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