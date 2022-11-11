<script setup>
// import { defineProps ,withDefaults} from 'vue'
import UserBar from '../../partials/UserBar.vue'
import { useRoute } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faCube, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
library.add(faGear, faCube, faLocationDot, faPaperPlane)

const publicUrl = '/' + useRoute().params.publicURL
</script>

<template>
  <UserBar />
  <div>
    <aside class="fixed overflow-x-hidden z-0 w-[88px] h-full flex justify-center items-start bg-white shadow-md">
      <div class="top-[88px] pt-5">
        <ul>
          <li>
            <router-link :to="publicUrl + '/edit'" replace exact-active-class="link--active">
              <font-awesome-icon icon="fa-solid fa-gear" size="xl" />
            </router-link>
          </li>
          <li>
            <router-link :to="publicUrl + '/setting-ar'" replace exact-active-class="link--active">
              <font-awesome-icon icon="fa-solid fa-cube" size="xl" />
            </router-link>
          </li>
          <li>
            <router-link :to="publicUrl + '/spotlist'" replace exact-active-class="link--active">
              <font-awesome-icon icon="fa-solid fa-location-dot" size="xl" />
            </router-link>
          </li>
          <li>
            <router-link :to="publicUrl + '/public'" replace exact-active-class="link--active">
              <font-awesome-icon icon="fa-solid fa-paper-plane" size="xl" />
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
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
