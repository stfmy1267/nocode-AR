<script setup>
import { ref, onMounted } from 'vue'
import SideMenu from '../components/SideMenu.vue'
import L from 'leaflet'

let lat = ref()
let lng = ref()
onMounted(() => {
  let map = L.map('map').fitWorld()
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 15,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map)
  map.setView([38.575, 136.984], 5)
  let marker
  map.on('click', function (e) {
    if (marker) map.removeLayer(marker) //マーカー削除
    marker = L.marker(e.latlng).addTo(map) //マーカー追加
    marker.bindPopup('緯度:' + e.latlng.lat + '<br>経度:' + e.latlng.lng).openPopup()
    lat.value = e.latlng.lat
    lng.value = e.latlng.lng
  })
})

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
    <div class="w-2/4 m-auto mt-10 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">基本情報</h2>
      <div class="w-[90%] m-auto overflow-auto">
        <div class="mb-5">
          <h3 class="mb-2 px-3">スポット名</h3>
          <form>
            <textarea name="title" rows="1" class="w-full py-1 px-3" />
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
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl px-2">位置情報の設定</h2>
      <!-- eslint-disable  -->
      <div id="map" class="h-[400px]"></div>
      <p>{{ '緯度:' + lat + '経度:' + lng }}</p>
      <!-- eslint-enable  -->
      <div class="w-[90%] m-auto overflow-auto" />
    </div>

    <div class="flex justify-center items-center">
      <button class="w-48 h-12 mb-10 btn-gray">保存</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enter {
  border: 10px dotted powderblue;
}
</style>
