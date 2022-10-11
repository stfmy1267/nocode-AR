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
// const router = useRouter()

const store = useStore()

const email = ref('')
const password = ref('')
// const error = ref('')
const login = async () => {
  store
    .dispatch('login', {
      email: email.value,
      password: password.value,
    })
    .then(() => {
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
    <h3 class="text-4xl mt-10 mb-12 text-center">ログイン</h3>
    <form @submit.prevent="login">
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
        <button type="submit" class="w-[250px] h-[60px] text-white text-2xl text-center bg-black rounded-[20px]">ログイン</button>
      </div>
    </form>

    <div class="text-center">
      パスワードを忘れた場合：<a href="" class="text-blue-600">パスワードリセット</a><br><br>
      まだユーザーを登録していない場合：<router-link to="/singup" class="text-blue-600">ユーザー登録</router-link><br><br>
      <a href="" class="text-blue-600">Webサイトに戻る</a>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  width: 50%;
}
</style>
