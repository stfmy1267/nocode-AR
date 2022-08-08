<script setup>
import HeaderApp from '../components/Header.vue'
import SideMenu from '../components/SideMenu.vue'
import SaveButton from '../components/SaveButton.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const breakpoints = {
  // 0px and up
  0: {
    itemsToShow: 1,
  },
  // 700px and up
  750: {
    itemsToShow: 3,
  },
}
let ARimages = ['src/assets/augmented-reality.png', 'src/assets/customization.png', 'src/assets/pin.png']
</script>

<template>
  <div>
    <HeaderApp />
    <SideMenu />
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">ARキャラクター</h2>
      <h3 class="mb-10 px-3 text-center">テンプレートキャラクター</h3>
      <div class="flex flex-col justify-center items-center">
        <carousel
          :items-to-show="2.5" :wrap-around="true" :breakpoints="breakpoints"
          class="mb-10"
        >
          <slide v-for="ARimage in ARimages" :key="ARimage">
            <div class="carousel__item w-5/6 h-full">
              <img :src="ARimage" class="object-cover">
            </div>
          </slide>
          <template #addons>
            <navigation />
          </template>
        </carousel>
        <button class="w-20 h-10 btn-gray rounded-lg mb-10">選択</button>
      </div>
      <div class="w-[90%] m-auto overflow-auto" />
    </div>
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">ARアップロード</h2>
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center w-[40vmin] h-[40vmin] bg-gray-400 mb-5">
          <p>ファイルアップロード</p>
        </div>
        <input type="file" accept=".obj, .gltf">
        <p class="text-md">obj,gltf形式以外のファイルはアップロードできません。</p>
      </div>
      <div class="w-[90%] m-auto overflow-auto" />
    </div>
    <SaveButton />
  </div>
</template>
