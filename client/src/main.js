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
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.get('http://localhost:3000/api/users/user').then(async (response) => {
    let user = response.data
    await store.dispatch('setUser', user)
    await store.dispatch('getAllRally', user.id)
    createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
  }).catch(async(err)=>{
    console.log(err.response.data.message)
    router.push('/login')
    createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
  })
} else {
  createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
}
