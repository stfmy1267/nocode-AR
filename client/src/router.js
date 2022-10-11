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
// import rally views
import RallyHome from './views/rally/Home.vue'
import Map from './views/rally/Map.vue'
import AR from './views/rally/AR.vue'
import StampList from './views/rally/StampList.vue'

// metaに正しいトークンがあれば移動できるように設定
const routes = [
  // { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/singup', component: SingUp },
  { path: '/', component: RallyList, meta: { requiresAuth: true } },
  { path: '/:id/edit', component: Edit, meta: { requiresAuth: true } },
  { path: '/:id/setting-ar', component: SettingAR, meta: { requiresAuth: true } },
  { path: '/:id/spot', component: Spot, meta: { requiresAuth: true } },
  { path: '/:id/spotlist', name: 'spotlist', component: SpotList, meta: { requiresAuth: true } },
  { path: '/:id/public', component: Public, meta: { requiresAuth: true } },
  { path: '/:id/test', component: test, meta: { requiresAuth: true } },
  // Rally
  { path: '/:id', component: RallyHome },
  { path: '/:id/map', component: Map },
  { path: '/:id/AR', component: AR },
  { path: '/:id/stamplist', component: StampList },
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
