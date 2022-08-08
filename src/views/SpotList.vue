<script setup>
import HeaderApp from '../components/Header.vue'
import SideMenu from '../components/SideMenu.vue'
</script>

<template>
  <div class="flex-1">
    <HeaderApp />
    <SideMenu />
    <div class="w-3/4 m-auto mt-10 flex-1">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl ml-[3%]">スポット一覧</h2>
        <button class="btn-gray w-48 h-12 mr-[3%]">＋新規作成</button>
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
          <tr>
            <td class="border px-4 py-2">
              <img src="">
            </td>
            <td class="border px-4 py-2">Intro to CSS</td>
            <td class="border px-4 py-2">
              <button class="btn-gray mb-3 w-4/5" @click="$router.push('/spot')">編集する</button>
              <br>
              <button class="btn-gray">削除する</button>
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
</style>
