import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('accessToken')
if (token) {
  console.log(token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.get('http://localhost:3000/api/users/user').then(async (response) => {
    console.log(response.data)
    let user = response.data
    console.log(user.id)
    await store.dispatch('setUser', user)
    await store.dispatch('getAllRally', user.id)
    createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
  })
} else {
  createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
}
