<script>
  export default {

    async created() {
      await this.$axios.get('/message').then((res) => {
        console.log(res.data)
      })
    },
  }
// import { ref } from 'vue'

// const showSideMenu = () => {
//   let curentURL = ref(location.pathname)
//   let sideMenuActive = ref(true)
//   console.log(curentURL)

//   if (curentURL.value === '/gitbucket/Fumiya238/nocode-AR/pages/rallylist/') {
//     sideMenuActive.value = false
//   } else {
//     sideMenuActive.value = true
//   }
// }

// import HeaderApp from './components/Header.vue'
</script>

<template>
  <div id="app">
    <header class="sticky top-0 z-10 h-[88px] flex justify-between items-center bg-white shadow-md">
      <h1 class="text-3xl ml-[4%] hover:cursor-pointer" @click="$router.push('./')">nocode-AR</h1>
      <img src="" alt="">
    </header>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
ul {
  li {
    margin-bottom: 3rem;
    width: 100%;
    height: 100%;
    a {
      position: relative;
      overflow: hidden;
      outline: none;
      display: inline-block;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: solid black 1px;
      ::after {
        content: '';
        /*絶対配置で波紋位置を決める*/
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        /*波紋の形状*/
        background: radial-gradient(circle, rgb(0, 39, 117) 10%, transparent 10%) no-repeat 50%;
        transform: scale(10, 10);
        /*はじめは透過0に*/
        opacity: 0;
        /*アニメーションの設定*/
        transition: transform 0.3s, opacity 1s;
      }
      :active:a::after {
        transform: scale(0, 0);
        transition: 0s;
        opacity: 0.3;
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
    .link--active {
      background-color: rgb(82, 82, 255);
    }
  }
}
</style>
