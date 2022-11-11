<script setup>
import Header from '../components/layouts/admin/Header.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '../router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import eyes icons */
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faEye, faEyeSlash)

const store = useStore()

const email = ref('')
const password = ref('')
const register = () => {
  store
    .dispatch('register', {
      email: email.value,
      password: password.value,
    })
    .then( async () => {
      await store.dispatch('getAllRally')
      await store.dispatch('getAllSpot')
      router.push('/')
    })
}

let isEye = ref(true)
const pushHideButton = () => {
  isEye.value = !isEye.value
  let txtPass = document.getElementById('password')
  if (isEye.value) {
    txtPass.type = 'password'
  } else {
    txtPass.type = 'text'
  }
}
</script>

<template>
  <div>
    <Header />
    <h3 class="text-4xl mt-10 mb-12 text-center">ユーザー登録</h3>
    <form @submit.prevent="register">
      <div class="flex flex-col justify-center items-center mb-4">
        <div class="form-wrapper">
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="メールアドレス"
            class="form-box"
            autocomplete="email"
            required
          >
        </div>
        <div class="form-wrapper relative">
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            placeholder="パスワード"
            class="form-box"
            autocomplete="current-password"
            minlength="6"
            required
          >
          <div class="absolute right-4 top-[19px]" @click="pushHideButton">
            <font-awesome-icon
              v-show="isEye" id="buttonEye" size="lg"
              :icon="['fa-solid', 'fa-eye']"
            />
            <font-awesome-icon
              v-show="!isEye" id="buttonEye" size="lg"
              :icon="['fa-solid', 'fa-eye-slash']"
            />
          </div>
        </div>
        <button type="submit" class="w-[250px] h-[60px] text-white text-2xl text-center bg-black rounded-[20px]">
          ユーザー登録
        </button>
      </div>
    </form>

    <div class="text-center">
      すでに登録している場合：<router-link to="/login" class="text-blue-600">ログイン</router-link><br><br>
      <a href="" class="text-blue-600">Webサイトに戻る</a>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  width: 50%;
}

.error {
  color: #8a0421;
  border-color: #dd0f3b;
  background-color: #ffd9d9;
}
</style>
