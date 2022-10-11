<script setup>
import { ref } from 'vue'
import Header from '../../components/layouts/admin/Header.vue'
import SideMenu from '../../components/layouts/admin/SideMenu.vue'

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
    <Header />
    <SideMenu />
    <div class="w-2/4 m-auto mt-10 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">基本情報</h2>
      <div class="w-[90%] m-auto overflow-auto">
        <div class="mb-5">
          <h3 class="mb-2 px-3">スタンプラリー名</h3>
          <form>
            <textarea name="title" rows="1" class="w-full py-1 px-3" />
          </form>
        </div>
        <div class="mb-5">
          <h3 class="mb-2 px-3">キャッチコピー</h3>
          <form>
            <textarea name="cc" rows="1" class="w-full py-1 px-3" />
          </form>
        </div>
        <div class="mb-5">
          <h3 class="mb-2 px-3">紹介文</h3>
          <form>
            <textarea name="introduction" rows="5" class="w-full py-1 px-3" />
          </form>
        </div>
      </div>
    </div>
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">画像情報</h2>
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
            accept=".jpeg, .png, .gif"
            class="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
            @change="onFileChange"
          >
          <p v-if="!uploadedImage" class="text-[#aaa] text-center">
            画像をドラッグ＆ドロップ
            <br>またはクリックでファイル選択
          </p>
        </div>
      </div>
      <div class="w-[90%] m-auto overflow-auto" />
    </div>
    <div class="flex justify-center items-center">
      <button class="w-48 h-12 mb-10 btn-gray">保存</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enter {
  background-color: #666;
}
</style>
