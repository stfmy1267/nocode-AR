import store from './store/index'
import { createRouter, createWebHistory } from 'vue-router'
// import admin views
import Login from './views/Login.vue'
import SingUp from './views/SingUp.vue'
import RallyList from './views/RallyList.vue'
import Edit from './views/admin/Edit.vue'
import SettingAR from './views/admin/SettingAR.vue'
import Spot from './views/admin/Spot.vue'
import SpotList from './views/admin/SpotList.vue'
import Public from './views/admin/Public.vue'
import test from './views/test.vue'

// metaに正しいトークンがあれば移動できるように設定
const routes = [
  { path: '/login', component: Login },
  { path: '/singup', component: SingUp },
  { path: '/', component: RallyList, meta: { requiresAuth: true } },
  { path: '/:publicURL/edit', component: Edit, meta: { requiresAuth: true } },
  { path: '/:publicURL/setting-ar', component: SettingAR, meta: { requiresAuth: true } },
  { path: '/:publicURL/spot/:id', component: Spot, meta: { requiresAuth: true } },
  { path: '/:publicURL/spotlist', name: 'spotlist', component: SpotList, meta: { requiresAuth: true } },
  { path: '/:publicURL/public', component: Public, meta: { requiresAuth: true } },
  { path: '//test', component: test, meta: { requiresAuth: true } },
  // { path: "/:catchAll(.*)",component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

// const addURL = (url) =>{
//   router.push({
//     path:'/'+ url
//   })
// }
// if (store.state.stampRally[0]){
//   addURL(store.state.stampRally[0].url)
// }

export default router
