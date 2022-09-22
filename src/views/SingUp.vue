<script setup>
import { ref } from 'vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import eyes icons */
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faEye, faEyeSlash)

// import { userRouter } from 'vue-router';
// import axios from 'axios';
// const router = userRouter();

const user_name = ref('')
const email = ref('')
const password = ref('')

// const error = ref('')

// const register = () => {
//   axios
//     .post('http://localhost:3000/api/users/register', {
//       user_name: user_name.value,
//       email: email.value,
//       password: password.value,
//     })
//     .then((response) => {
//       console.log(response.data);
//       router.push('/');
//     })
//     .catch((err) => {
//       error.value = err.response.data.message;
//     })
// };
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
    <div class="flex justify-center items-center w-full h-20 mb-8 text-center border-b-2 border-black">
      <div class="text-4xl">nocode-AR</div>
    </div>
    <h3 class="text-4xl mb-12 text-center">ユーザー登録</h3>
    <form @submit.prevent="register">
      <div class="flex flex-col justify-center items-center mb-4">
        <div class="form-wrapper">
          <input
            id="user_name"
            v-model="user_name"
            type="user_name"
            name="user_name"
            class=" form-box "
            placeholder="ユーザーネーム"
            autocomplete="user_name"
            required
          >
        </div>
        <div class="form-wrapper">
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="メールアドレス"
            class=" form-box "
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
            class=" form-box "
            autocomplete="current-password"
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
        <button
          to="/rallylist"
          type="submit"
          value="ユーザー登録"
          class="w-[250px] h-[60px] text-white text-2xl text-center bg-black rounded-[20px]"
          @submit.prevent="register"
          @click="$router.push('/rallylist')"
        >
          ユーザー登録
        </button>
      </div>
    </form>

    <div class="text-center">
      パスワードを忘れた場合：<a href="" class="text-blue-600">パスワードリセット</a><br><br>
      まだユーザーを登録していない場合：<a href="" class="text-blue-600">ユーザー登録</a><br><br>
      <a href="" class="text-blue-600">Webサイトに戻る</a>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper{
  width: 50%;
}
</style>
