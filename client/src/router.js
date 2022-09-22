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

const routes = [
  // { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/singup', component: SingUp },
  { path: '/', component: RallyList },
  { path: '/edit', component: Edit },
  { path: '/setting-ar', component: SettingAR },
  { path: '/spot', component: Spot },
  { path: '/spotlist', name: 'spotlist', component: SpotList },
  { path: '/public', component: Public },
  { path: '/test', component: test },
  // { path: "/:catchAll(.*)",component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
