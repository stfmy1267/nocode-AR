<script setup>
import { ref, reactive, computed } from 'vue'
import SideMenu from '../../components/layouts/admin/SideMenu.vue'
import Header from '../../components/layouts/admin/Header.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'

library.add(faCopy)
const store = useStore()

let stampRally = computed(() => store.getters.getRally(useRoute().params.publicURL))
let stateVal = reactive({
  testUrl: stampRally.value[0].test_url,
  publicUrl: stampRally.value[0].public_url,
})
const publicURL = 'http://localhost:3000/stamp-rally/' + stateVal.publicUrl + '/home'
const testURL ='http://localhost:3000/stamp-rally/' + stateVal.testUrl + '/home'

let copyTest = ref(false)
let copyPublic = ref(false)

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      if (text === testURL) {
        copyTest.value = true
        setTimeout(
          function () {
            copyTest.value = false
          }.bind(this),
          2000
        )
      } else {
        copyPublic.value = true
        setTimeout(
          function () {
            copyPublic.value = false
          }.bind(this),
          2000
        )
      }
    })
    .catch((e) => {
      console.error(e)
    })
}
const changePublicState = async() => {
  await axios.post('http://localhost:3000/api/user/public',{
    url:stateVal.publicUrl
  })

}
</script>

<template>
  <div>
    <Header />
    <SideMenu />
    <div class="w-2/4 m-auto mt-10 bg-gray-300 mb-10">
      <h2 class="bg-black text-white text-xl mb-5 px-2">公開情報</h2>
      <div class="w-[90%] m-auto overflow-auto">
        <div class="mb-5">
          <h3 class="mb-2 px-3">テスト用URL</h3>
          <div class="w-full py-1 px-3 bg-white h-12 flex justify-between items-center relative">
            <p>{{ testURL }}</p>
            <font-awesome-icon
              icon="fa-regular fa-copy"
              class="h-8 object-cover cursor-pointer transition-[.3s] hover:h-10 hover:transition-[.3s]"
              @click="copyToClipboard(testURL)"
            />
            <span class="absolute z-10 -top-5 right-0 text-sm opacity-0 transition-[.3s]" :class="{ copyAction: copyTest }">
              コピーしました
            </span>
          </div>
        </div>
        <div class="mb-5">
          <h3 class="mb-2 px-3">公開用URL</h3>
          <div class="w-full py-1 px-3 bg-white h-12 flex justify-between items-center relative">
            <p>{{ publicURL }}</p>
            <font-awesome-icon
              icon="fa-regular fa-copy"
              class="h-8 object-cover cursor-pointer transition-[.3s] hover:h-10 hover:transition-[.3s]"
              @click="copyToClipboard(publicURL)"
            />
            <span class="absolute z-10 -top-5 right-0 text-sm opacity-0 transition-[.3s]" :class="{ copyAction: copyPublic }">
              コピーしました
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <button class="w-48 h-12 mb-10 btn-gray" @click="changePublicState()">公開する</button>
    </div>
  </div>
</template>

<style>
.copyAction {
  opacity: 1;
  transition: 0.3s;
}
</style>
