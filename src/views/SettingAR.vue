<script setup>
import { ref } from 'vue'
import SideMenu from '../components/SideMenu.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
// let check = ref('')
// let tpl = ref('')
let previewActive = ref(false)

const chengeModel = (e) => {
  const modelPreview = document.getElementById('model-preview')
  previewActive.value = true
  if (e.target.value === 'tpl-0') {
    modelPreview.src = ARimages[0]
  } else if (e.target.value === 'tpl-1') {
    modelPreview.src = ARimages[1]
  } else {
    modelPreview.src = ARimages[2]
  }
}

const resetModel = () => {
  const modelPreview = document.getElementById('model-preview')
  modelPreview.src = ''
  for (const element of document.getElementsByName('model-tpl')) {
    element.checked = false
  }
  previewActive.value = false
}

const breakpoints = {
  // 0px and up
  0: {
    itemsToShow: 1,
  },
  // 700px and up
  750: {
    itemsToShow: 2.1,
  },
}
let ARimages = ['./images/tpl-1.png', './images/tpl-2.png', './images/tpl-3.png']
window.onbeforeunload = (e) => {
  e.returnValue = '本当にページを閉じますか？'
}
// ドラックした時のクラスをオン・オフ切り替えるやつ
let isEnter = ref(false)
// base64 エンコーディングされた data: URL の文字列が格納される
let uploadedImage = ref('')
// 画像の名前が入る
let img_name = ref('')
// ファイルのデータが入る
const files = ref('')

// カーソルがエリアにある時
const dragEnter = () => {
  isEnter.value = true
}
// カーソルがエリアにない時
const dragLeave = () => {
  isEnter.value = false
}
// 画像のパスを作成
const createImage = (file) => {
  // レンダーを定義
  const reader = new FileReader()
  reader.onload = (e) => {
    // base64 エンコーディングされた data: URL の文字列を入れている
    uploadedImage.value = e.target.result
  }
  // よくわからん
  reader.readAsDataURL(file)
}
// 画像をドラック＆ドロップした時
const dropFile = (e) => {
  isEnter.value = false
  // ファイルデータを格納
  files.value = e.dataTransfer.files
  // クリエイトイメージ関数に画像データを渡す
  createImage(files.value[0])
  // 画像の名前を取り出す
  img_name.value = files.value[0].name
}
// 画像を選択した時
const onFileChange = (e) => {
  // ファイルデータを格納
  files.value = e.target.files || e.dataTransfer.files
  // クリエイトイメージ関数に画像データを渡す
  createImage(files.value[0])
  // 画像の名前を取り出す
  img_name.value = files.value[0].name
}
</script>

<template>
  <div>
    <SideMenu />
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">ARキャラクター選択</h2>
      <div class="flex flex-col justify-center items-center mt-20">
        <carousel :wrap-around="true" :breakpoints="breakpoints" class="mb-10">
          <slide v-for="(ARimage, index) in ARimages" :key="ARimage">
            <div class="carousel__item w-5/6 h-full flex-col">
              <img :src="ARimage" class="object-cover">
              <input
                :id="'tpl' + index"
                v-model="tpl"
                type="radio"
                name="model-tpl"
                :value="'tpl-' + index"
                class="opacity-0"
                @change="chengeModel"
              >
              <label :for="'tpl' + index" class="w-20 btn-gray text-center text-xl"> 選択 </label>
            </div>
          </slide>
          <template #addons>
            <navigation />
          </template>
        </carousel>
        <img v-show="previewActive" id="model-preview" class="w-4/5 mb-10 object-cover">
        <button class="btn-gray mb-8 text-xl p-3" @click="resetModel">リセット</button>
      </div>
    </div>
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">ARキャラクターアップロード</h2>
      <div class="flex flex-col justify-center items-center">
        <div
          class="flex flex-col justify-center items-center w-[40vmin] h-[40vmin] bg-[#eee] mb-5 relative"
          :class="{ enter: isEnter }"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragover.prevent
          @drop.prevent="dropFile"
        >
          <img v-show="uploadedImage" :src="uploadedImage" class="py-2 object-cover max-h-[40vmin] max-w-[40vmin]">
          <p>
            {{ img_name }}
          </p>
          <input
            ref="preview"
            type="file"
            accept=".gltf .obj"
            class="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
            @change="onFileChange"
          >
          <p v-if="!uploadedImage" class="text-[#aaa] text-center">
            キャラクターをドラッグ＆ドロップ
            <br>またはクリックでファイル選択
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <button class="w-48 h-12 mb-10 btn-gray">保存</button>
    </div>
  </div>
</template>

<style scoped>
input:checked + label {
  background-color: gray;
}
</style>
