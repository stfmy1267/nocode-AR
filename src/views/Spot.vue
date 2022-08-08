<script setup>
import HeaderApp from '../components/Header.vue'
import SideMenu from '../components/SideMenu.vue'
import SaveButton from '../components/SaveButton.vue'
</script>

<template>
  <div>
    <HeaderApp />
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
          class="flex flex-col justify-center items-center w-[40vmin] h-[40vmin] bg-gray-400 mb-5"
          :class="{ enter: isEnter }"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
        >
          <p>ファイルアップロード</p>
          <!-- <img src="" class="w-full h-full"> -->
        </div>
        <input type="file" accept=".jpg, .png, .gif">
        <p class="text-md">JPEG、GIF、PNG形式以外のファイルはアップロードできません。</p>
      </div>
      <div class="w-[90%] m-auto overflow-auto" />
    </div>
    <div class="w-2/4 m-auto mt-10 mb-14 bg-gray-300">
      <h2 class="bg-black text-white text-xl mb-5 px-2">位置情報</h2>
      <h3 class="mb-2 px-3">マップ</h3>
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center w-[40vmin] h-[40vmin] bg-gray-400 mb-5" />
        <button class="">削除する</button>
        <p class="text-md">JPEG、GIF、PNG形式以外のファイルはアップロードできません。</p>
      </div>
      <div class="w-[90%] m-auto overflow-auto" />
    </div>
    <SaveButton />
  </div>
</template>

<style lang="scss" scoped>
.enter {
  border: 10px dotted powderblue;
}
</style>
