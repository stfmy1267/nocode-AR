import store from './store/store'
import { createRouter, createWebHistory } from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SingUp from './views/SingUp.vue'
import RallyList from './views/RallyList.vue'
import Edit from './views/Edit.vue'
import SettingAR from './views/SettingAR.vue'
import Spot from './views/Spot.vue'
import SpotList from './views/SpotList.vue'
import Public from './views/Public.vue'
import test from './views/test.vue'

// metaに正しいトークンがあれば移動できるように設定
const routes = [
  // { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/singup', component: SingUp },
  { path: '/', component: RallyList, meta: { requiresAuth: true } },
  { path: '/edit', component: Edit, meta: { requiresAuth: true } },
  { path: '/setting-ar', component: SettingAR, meta: { requiresAuth: true } },
  { path: '/spot', component: Spot, meta: { requiresAuth: true } },
  { path: '/spotlist', name: 'spotlist', component: SpotList, meta: { requiresAuth: true } },
  { path: '/public', component: Public, meta: { requiresAuth: true } },
  { path: '/test', component: test, meta: { requiresAuth: true } },
  // { path: "/:catchAll(.*)",component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log(store.state.user)
    if (!store.state.user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
