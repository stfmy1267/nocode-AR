import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import { auth } from './modules';
// ルート処理用にインポート

export default createStore({
  // データの保存場所
  state() {
    return {
      Token: null,
      user: null,
      count: 0,
      stampRally: [],
    }
  },
  // データを取ってくる場所
  // アロー関数は：と=>をつけるreturnを省略できる
  getters: {
    getUser: (state) => state.user,
    getAllRally: (state) => state.stampRally,
  },
  // データを変更する処理
  mutations: {
    // function関数の書き方は:を付けない(値を代入しているだけだからreturnはいらない)
    updateToken(state, Token) {
      state.Token = Token
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLocalStorage(state, payload) {
      localStorage.setItem('accessToken', payload.token)
      localStorage.setItem('expiryTimeMs', payload.expiryTimeMs)
    },
    clearAuth(state) {
      axios.defaults.headers.common['Authorization'] = null
      state.user = null
      localStorage.clear()
    },
    saveRally: (state, newStampRally) => {
      state.stampRally.unshift(newStampRally)
    },
  },
  // 非同期処理
  actions: {
    // ログイン
    // commitはmutationsを使うため、authDataはメールとパスワードが来る
    login: async ({ commit, dispatch }, authData) => {
      await axios
        .post('http://localhost:3000/api/users/login', {
          email: authData.email,
          password: authData.password,
        })
        .then(async (response) => {
          // tokenと有効期限がかえってくる
          console.log(response.data)
          // 今の時間取得
          let now = new Date();
          // 今の時間と有効期限の時間を足した時間がトークンが切れる時間
          let expiryTimeMs = now.getTime() + response.data.expiresIn
          let tokenData = {
            token: response.data.token,
            expiryTimeMs: expiryTimeMs
          }
          // vuexに保存
          commit('updateToken', tokenData.token)
          // ローカルストレージに保存
          commit('setLocalStorage', tokenData)
          // ヘッダーにトークンを保存
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData.token}`
          // レスポンスにuser情報を格納しcmmitする
          // ヘッダーにトークンが入っているため第二引数には何もいらない
          // レスポンスにユーザ情報がかえってくる
          const user = await axios.get('http://localhost:3000/api/users/user')
          // vuexにユーザー保存
          commit('setUser', user.data)
          // ログインの場合はスタンプラリーも一緒に取得
          await dispatch('getAllRally')
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    // 新規登録
    register: async ({ commit }, authData) => {
      await axios
        .post('http://localhost:3000/api/users/register', {
          email: authData.email,
          password: authData.password,
        })
        .then(async (response) => {
          // 今の時間取得
          let now = new Date();
          // 今の時間と有効期限の時間を足した時間がトークンが切れる時間
          let expiryTimeMs = now.getTime() + response.data.expiresIn
          let tokenData = {
            token: response.data.token,
            expiryTimeMs: expiryTimeMs
          }
          commit('updateToken', tokenData.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData.token}`
          const user = await axios.get('http://localhost:3000/api/users/user')
          // vuexにユーザー保存
          commit('setUser', user.data)
          commit('setLocalStorage', tokenData)
          // 新規登録の場合はスタンプラリーはないので保存処理を行わない
        })
        .catch((err) => {
          if (err.response.data.errors) {
            if (err.response.data.errors[0].param === 'email') {
              console.log('メールのフォーマットが不適切です')
            } else if (err.response.data.errors[0].param === 'password') {
              console.log('無効なパスワードです。')
            }
          } else if (err.response.data.message) {
            console.log(err.response.data.message)
          }
          router.push('/singup')
        })
    },
    refreshToken: async ({ commit }) => {
      await axios
        .get('http://localhost:3000/api/users/refreshToken')
        .then((response) => {
          // tokenと有効期限がかえってくる
          // 今の時間取得
          let now = new Date();
          // 今の時間と有効期限の時間を足す
          let expiryTimeMs = now.getTime() + response.data.expiresIn
          let tokenData = {
            token: response.data.token,
            expiryTimeMs: expiryTimeMs
          }
          commit('updateToken', tokenData.token)
          commit('setLocalStorage', tokenData)
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData.token}`
        }).catch((err) => {
          console.log(err.response)
        })
    },
    getAllRally: async ({ state, commit }) => {
      // vuexのスタンプラリーがなければ実行
      if (state.stampRally.length === 0) {
        await axios
          .get('http://localhost:3000/api/user/rallies')
          .then((response) => {
            // スタンプラリ一覧がかえってくる、それをvuexに保存
            commit('saveRally', response.data)
          }).catch((err) => {
            // DBにスタンプラリーが一個もなければVuexに保存しない
            console.log(err.response.data.message)
          })
      }
    },
    logout({ commit }) {
      commit('clearAuth')
    },
    setUser({ commit }, payload) {
      commit('setUser', payload)
    },
  },
  modules: {auth},
})
