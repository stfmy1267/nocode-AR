import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import jwt_decode from 'jwt-decode';
// ストレージからトークンとログイン時に設定した有効期限を取得

const token = localStorage.getItem('accessToken')
const expiryTimeMs = localStorage.getItem('expiryTimeMs')
let now = new Date()
// 今の時間とログイン時の有効期限の時間を比較し、
// 今の時間の方が大きかったら有効期限が過ぎている
const isExpired = now.getTime() >= expiryTimeMs

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  if (!isExpired) {
    // もし有効期限が切れていなかったら時間延長
    store.dispatch('refreshToken')
  }
  axios
    .get('http://localhost:3000/api/users/user')
    .then(async (response) => {
      let user = response.data
      await store.dispatch('setUser', user)
      await store.dispatch('getAllRally')
      createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
    })
    .catch(async (err) => {
      console.log(err.response.data.message)
      router.push('/login')
      createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
    })
} else {
  createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
}
