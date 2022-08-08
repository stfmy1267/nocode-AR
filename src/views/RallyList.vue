<script setup>
import HeaderApp from '../components/Header.vue'
import { reactive,ref } from 'vue'

// ポップアップのON/OFF
let popActive = ref(false)
const showPopUp = () => {
  popActive.value = !popActive.value
}
const s = reactive({
test: [
  {
    title: "高美台ラリー",
    arType: "マーカー"
  },
  {
    title: "高美台ラリー",
    arType: "マーカー"
  },
  {
    title: "高美台ラリー",
    arType: "マーカー"
  },
]
})
  console.log(s.test[0].title)

// スタンプラリー作成
// もし、データベースにスタンプラリーがあるならそのデータを表示
// ない場合は表示しない
const state = reactive({
  rallys: [
    {
      title: "高美台ラリー",
      arType: "マーカー"
    },
    {
      title: "高美台ラリー",
      arType: "マーカー"
    },
    {
      title: "高美台ラリー",
      arType: "マーカー"
    },
  ],
})

// state.rallys[0] = state.rallyInfo
const createRally = () => {console.log("確認")
  state.rallyInfo.title = "こんにちわ"
  state.rallyInfo.arType = "ロケーション"
  state.rallys[0] = state.rallInfo
  // $router.push('/edit')
}

const deleteRally = () => {
  console.log("確認")
  // $router.push('/edit')
}
</script>

<template>
  <div class="flex-1">
    <HeaderApp />
    <div v-for="a in s.test" :key="a">
      <li>
        {{ a.title }}
      </li>
    </div>
    <div
      v-if="popActive"
      class="w-[70%] h-[80%] z-40 overflow-auto absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white border border-black"
    >
      <button class="text-4xl absolute top-3 right-5" @click="showPopUp">×</button>
      <div class="flex flex-col items-center mb-10">
        <h1 class="text-center text-xl my-5">1. スタンプラリー名を決める</h1>
        <textarea name="title" rows="1" class="w-[80%] h-10 text-xl py-1 px-3 text-center border border-black bottom-1" />
      </div>
      <div>
        <h1 class="text-center text-xl my-5">2. 作成する型を決める</h1>
        <div class="flex justify-around items-center mb-10">
          <div class="flex flex-col justify-center items-center">
            <input
              id="marker" type="radio" value="マーカーベースAR"
              name="ARtype" class="opacity-0"
            >
            <label for="marker" class="w-[90%] h-[35vmin] mb-5 rounded-xl btn-gray">
              <p class="w-full position-center text-center text-lg">
                マーカーベース<br>AR
              </p>
            </label>
            <p class="text-center">
              利用シーン<br>
              「ショッピングモール」・「学校」・「水族館」など
            </p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <input
              id="location" type="radio" value="マーカーベースAR"
              name="ARtype" class="opacity-0"
            >
            <label for="location" class="relative w-[90%] h-[35vmin] mb-5 rounded-xl btn-gray">
              <p class="w-full position-center text-center text-lg">
                ロケーションベース<br>
                <span class="">AR</span>
              </p>
            </label>
            <p class="text-center">
              利用シーン<br>
              「ゴルフ場」・「建築物・建物」・「観光地」など
            </p>
          </div>
        </div>
      </div>
      <button
        class="w-48 h-10 mb-10 relative left-1/2 -translate-x-[50%] btn-gray"
        @click="createRally"
      >
        作成する
      </button>
    </div>
    <div class="w-3/4 m-auto mt-10 flex-1">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl ml-[3%]">スタンプラリー一覧</h2>
        <button class="w-48 h-12 mr-[3%] btn-gray" @click="showPopUp">＋新規作成</button>
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
          <tr v-for="rally in state.rallys" :key="rally">
            <td class="border">
              <img src="">
            </td>
            <td class="border px-4 py-2">{{ rally.title }}</td>
            <td class="border px-4 py-2">非公開</td>
            <td class="border px-4 py-2">{{ rally.arType }}</td>
            <td class="border px-4 py-2">
              <button class="btn-gray mb-3 w-4/5" @click="$router.push('/edit')">編集する</button>
              <br>
              <button class="btn-gray mb-3 w-4/5" @click="deleteRally">削除する</button>
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

#marker:checked + label,
#location:checked + label {
  background-color: gray;
}
</style>
