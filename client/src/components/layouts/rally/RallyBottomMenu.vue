<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faMap, faCube, faStamp } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faMap, faCube, faStamp )
</script>

<template>
  <ul>
    <li>
      <router-link to="/1">
        <font-awesome-icon icon="fa-solid fa-house" size="xl" />
        <span>ホーム</span>
      </router-link>
    </li>
    <li>
      <router-link to="/1/map/">
        <font-awesome-icon icon="fa-solid fa-map" size="xl" />
        <span>マップ</span>
      </router-link>
    </li>
    <li>
      <router-link to="/1/AR/">
        <font-awesome-icon icon="fa-solid fa-cube" size="xl" />
        <span>AR</span>
      </router-link>
    </li>
    <li>
      <router-link to="/1/stamplist/">
        <font-awesome-icon icon="fa-solid fa-stamp" size="xl" />
        <span>スタンプ</span>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  width: 100%;
}
ul li {
  border: solid;
  border-width: 1px 1px 0px 0px;
  list-style: none;
  width: 100%;
  text-align: center;
}
ul li:last-of-type {
  border-width: 1px 0px 0px 0px;
}
ul li a {
  display: block;
  width: 100%;
  text-decoration: none;
  color: black;
}
ul li a svg {
  margin: 7px 0px;
}
ul li span {
  display: block;
  position: relative;
  font-size: 16px;
}
</style>
