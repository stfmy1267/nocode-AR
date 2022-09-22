<script setup>
import { reactive, ref } from 'vue'
import SideMenu from '../components/SideMenu.vue'
// ポップアップのON/OFFと入力値のリセット
let setSpotPopup = ref(false)
const showCreatePopUp = () => {
  setSpotPopup.value = !setSpotPopup.value
  nameVal.value = ''
  nameError.value = false
}

// スタンプラリー作成
// もし、データベースにスタンプラリーがあるならそのデータを表示
// ない場合は表示しない
const state = reactive({
  spots: [],
})

let nameError = ref(false)

// スタンプラリー作成
let nameVal = ref('')

const createSpot = () => {
  if (nameVal.value === '') {
    nameError.value = true
  } else {
    state.spots.push({
      name: nameVal.value,
    })
    showCreatePopUp()
  }
}

const deleteSpot = (index) => {
  console.log(index)
  if (confirm('本当に削除しますか?')) {
    //確認をとる
    state.spots.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex-1">
    <SideMenu />
    <div v-if="setSpotPopup" class="w-[60%] h-[70%] z-40 overflow-auto position-center bg-white border border-black">
      <button class="text-4xl absolute top-3 right-5" @click="showCreatePopUp">×</button>
      <div class="h-full flex flex-col items-center justify-around mb-10">
        <h2 class="text-center text-xl my-5">スッポト名を入力してください</h2>
        <textarea
          id="title"
          v-model="nameVal"
          rows="1"
          class="w-[80%] h-10 text-xl py-1 px-3 text-center border border-black bottom-1"
          :class="{ error: nameError }"
        />
        <span v-if="nameError">×スポットの名前が入力されていません</span>
        <button class="w-48 h-10 mb-10 btn-gray" @click="createSpot()">作成する</button>
      </div>
    </div>

    <div class="w-3/4 m-auto mt-10 flex-1">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl ml-[3%]">スポット一覧</h2>
        <button class="btn-gray w-48 h-12 mr-[3%]" @click="showCreatePopUp">＋新規作成</button>
      </div>
      <table class="table-fixed mb-10 w-full">
        <thead>
          <tr>
            <th class="w-1/6 h-auto border px-4 py-4" />
            <th class="w-2/3 h-auto border px-4 py-4">スポット名</th>
            <th class="h-auto border px-4 py-4">編集</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(spot, index) in state.spots" :key="spot">
            <td class="border px-4 py-2">
              <img src="">
            </td>
            <td class="border px-4 py-2">{{ spot.name }}</td>
            <td class="border px-4 py-2">
              <button class="btn-gray mb-3 w-4/5" @click="$router.push('/spot')">編集する</button>
              <br>
              <button class="btn-gray" @click="deleteSpot(index)">削除する</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center items-center">
        <button class="btn-gray w-56 h-16 m-auto">もっと見る</button>
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
