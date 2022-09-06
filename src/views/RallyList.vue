<script setup>
import { reactive, ref } from 'vue'

// ポップアップのON/OFFと入力値のリセット
let createPopup = ref(false)
let check = ref('')
const showCreatePopUp = () => {
  createPopup.value = !createPopup.value
  titleVal.value = ''
  arTypeVal.value = ''
  check.value = false
  titleError.value = false
  arTypeError.value = false
}

// スタンプラリー作成
// もし、データベースにスタンプラリーがあるならそのデータを表示
// ない場合は表示しない
const state = reactive({
  rallys: [],
})

let titleError = ref(false)
let arTypeError = ref(false)

// スタンプラリー作成
let titleVal = ref('')
let arTypeVal = ref('')
const createRally = () => {
  if (!titleVal.value & !arTypeVal.value) {
    titleError.value = true
    arTypeError.value = true
  } else if (!titleVal.value) {
    titleError.value = true
    arTypeError.value = false
  } else if (!arTypeVal.value) {
    titleError.value = false
    arTypeError.value = true
  } else {
    state.rallys.push({
      title: titleVal.value,
      arType: arTypeVal.value,
    })
    showCreatePopUp()
  }
}

const deleteRally = (index) => {
  if (confirm('本当に削除しますか?')) {
    //確認をとる
    state.rallys.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex-1">
    <div v-if="createPopup" class="w-[70%] h-[80%] z-40 overflow-auto position-center bg-white border border-black">
      <button class="text-4xl absolute top-3 right-5" @click="showCreatePopUp">×</button>
      <div class="flex flex-col items-center mb-10">
        <h2 class="text-center text-xl my-5">1. スタンプラリー名を決める</h2>
        <textarea
          id="title"
          v-model="titleVal"
          rows="1"
          class="w-[80%] h-10 text-xl py-1 px-3 text-center border border-black bottom-1"
          :class="{ error: titleError }"
        />
        <span v-if="titleError">×スタンプラリーのタイトルが入力されていません</span>
      </div>
      <div>
        <h2 class="text-center text-xl my-5">2. 作成する型を決める</h2>
        <span v-if="arTypeError">×スタンプラリーのタイプが選択されていません</span>
        <div class="flex justify-around items-center mb-10">
          <div class="flex flex-col justify-center items-center">
            <input
              id="marker"
              v-model="arTypeVal"
              type="radio"
              :checked="check"
              value="マーカー型"
              name="ARtype"
              class="opacity-0"
            >
            <label for="marker" class="w-[90%] h-[35vmin] mb-5 rounded-xl btn-gray" :class="{ error: arTypeError }">
              <p class="w-full position-center text-center text-lg">マーカーベース<br>AR</p>
            </label>
            <p class="text-center">
              利用シーン<br>
              「ショッピングモール」・「学校」・「水族館」など
            </p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <input
              id="location"
              v-model="arTypeVal"
              type="radio"
              :checked="check"
              value="ロケーション型"
              name="ARtype"
              class="opacity-0"
            >
            <label for="location" class="relative w-[90%] h-[35vmin] mb-5 rounded-xl btn-gray" :class="{ error: arTypeError }">
              <p class="w-full position-center text-center text-lg">ロケーションベース<br>AR</p>
            </label>
            <p class="text-center">
              利用シーン<br>
              「ゴルフ場」・「建築物・建物」・「観光地」など
            </p>
          </div>
        </div>
      </div>
      <button class="w-48 h-10 mb-10 relative left-1/2 -translate-x-[50%] btn-gray" @click="createRally()">作成する</button>
    </div>
    <div class="w-3/4 m-auto mt-10 flex-1">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl ml-[3%]">スタンプラリー一覧</h2>
        <button class="w-48 h-12 mr-[3%] btn-gray" @click="showCreatePopUp">＋新規作成</button>
      </div>
      <table class="table-fixed mb-10 w-full">
        <thead>
          <tr>
            <th class="w-1/6 h-auto border px-4 py-4" />
            <th class="w-1/4 h-auto border px-4 py-4">タイトル</th>
            <th class="w-1/6 h-auto border px-4 py-4">公開状況</th>
            <th class="w-1/6 h-auto border px-4 py-4">AR型</th>
            <th class="w-1/6 h-auto border px-4 py-4">編集</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rally, index) in state.rallys" :key="rally">
            <td class="border">
              <img src="">
            </td>
            <td class="border px-4 py-2">{{ rally.title }}</td>
            <td class="border px-4 py-2">非公開</td>
            <td class="border px-4 py-2">{{ rally.arType }}</td>
            <td class="border px-4 py-2">
              <button class="btn-gray mb-3 w-4/5" @click="$router.push('/edit')">編集する</button>
              <br>
              <button class="btn-gray mb-3 w-4/5" @click="deleteRally(index)">削除する</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center items-center">
        <button v-if="false" class="w-56 h-16 m-auto btn-gray">もっと見る</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
tr:nth-child(even) {
  background-color: rgba(243, 244, 246);
}
tr {
  text-align: center;
  td {
    img {
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
    button {
      width: 80%;
      height: auto;
    }
    button:nth-child(1) {
      margin-bottom: 10px;
    }
  }
}
.selectType {
  background-color: gray;
}

input:checked + label {
  background-color: gray;
  border: black solid 2px;
}

.error {
  background-color: rgb(252, 227, 227);
  border: solid 2px rgb(195, 62, 62);
}
span {
  width: 100%;
  display: inline-block;
  text-align: center;
  color: rgb(195, 62, 62);
}
</style>
