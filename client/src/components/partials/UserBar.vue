<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../../router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket, faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
library.add(faCircleUser, faGear, faArrowRightFromBracket, faTrash)
const store = useStore()

let email = ref('ログアウト中')
const user = computed(() => store.getters.getUser)
if (user.value) {
  email.value = user.value.email
}

let showUser = ref(false)
const clickUserIcon = () => {
  showUser.value = !showUser.value
}
const logout = () => {
  store.dispatch('logout').then(() => {
    router.push('/login')
  })
}

const deleteUser = async () => {
  if (confirm('本当に削除しますか?')) {
    await axios.get("http://localhost:3000/api/users/delete")
    .then(() => {
      store.commit('clearAuth')
      router.push('/singup')
    })
  }
}
</script>

<template>
  <div class="fixed w-10 h-10 z-10 right-10">
    <font-awesome-icon
      icon="fa-regular fa-circle-user"
      size="2xl"
      fixed-width
      border
      class="absolute z-20 right-[4%] -top-[70px] transition-all rounded-xl hover:border-[3px] hover:border-blue-400"
      :class="{ hover_con: false }"
      @click="clickUserIcon"
    />
    <div v-if="showUser" class="z-20 absolute bg-white right-[4%] border-black border-2 rounded-xl px-12 py-4">
      <p class="mb-4 flex">
        <font-awesome-icon
          icon="fa-regular fa-circle-user" size="lg" fixed-width
          class="-translate-x-1"
        />{{ email }}
      </p>
      <button class="mb-4" @click="deleteUser()">
        <font-awesome-icon icon="fa-solid fa-trash" />
        アカウント削除
      </button>
      <br>
      <!-- <button class="mb-4">
        <font-awesome-icon icon="fa-solid fa-gear" size="lg" fixed-width />
        アカウント設定
      </button>
      <br> -->
      <button v-if="user" @click="logout">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" fixed-width />
        ログアウト
      </button>
      <div v-if="!user" class="flex flex-col items-center justify-center">
        <router-link to="/login" class="text-blue-600">ログイン</router-link>
        <router-link to="/singup" class="text-blue-600">ユーザー登録</router-link>
      </div>
    </div>
  </div>
</template>
