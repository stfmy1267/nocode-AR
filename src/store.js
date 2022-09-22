import { createStore } from 'vuex'

export default createStore({
  // データの保存場所
  state() {
    return {
      count: 0,
      rallys: [],
    }
  },
  // データを取ってくる場所
  getters: {
    getAllRally: (state) => state.rallys,
  },
  // データを変更する処理
  mutations: {
    saveRally(state, newRally) {
      newRally.id = ++state.count
      state.rallys.unshift(newRally)
    },
  },
  // 非同期処理
  actions: {},
  modules: {},
})
