<script setup>
import { onMounted } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faHouse, faMap, faCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faCamera, faHouse, faMap, faCheck)

onMounted(() => {
  const innerCircle = document.getElementById('inner-circle')
  const outerCircle = document.getElementById('outer-circle')
  let innerCircleWidth = innerCircle.offsetWidth
  let outerCircleWidth = outerCircle.offsetWidth
  let innerCircleHeight = innerCircleWidth * 2
  let outerCircleHeight = outerCircleWidth * 2
  innerCircle.style.height = innerCircleHeight + 'px'
  outerCircle.style.height = outerCircleHeight + 'px'
})
</script>

<template>
  <a-scene embedded arjs>
    <a-marker preset="hiro">
      <a-box position="0 -1 0" scale="1 1 1" color="grey" />
    </a-marker>
    <a-camera
      gps-camera="maxDistance:50" rotation-reader look-controls
      wasd-controls position="0 0 0"
    />
  </a-scene>
  <div class="ui-wrapper">
    <div id="inner-circle" class="circle">
      <div class="menu">
        <h1>AR</h1>
        <!-- <h1>CITY OF<br>ALISO VIEJO</h1> -->
        <p>
          <span>Wednessday</span>
          <br>
          <span style="margin-bottom: 10px">January 15, 2022</span>
          <span style="font-size: larger">20℃ ☁</span>
        </p>
      </div>
    </div>
    <div id="outer-circle">
      <a href="">
        <font-awesome-icon icon="fa-solid fa-house" size="lg" />
        <li>HOME</li>
      </a>
      <a href="">
        <font-awesome-icon icon="fa-solid fa-map" size="lg" />
        <li>MAP</li>
      </a>
      <a href="">
        <font-awesome-icon icon="fa-solid fa-camera" size="lg" />
        <li>CAMERA</li>
      </a>
      <a href="">
        <font-awesome-icon icon="fa-solid fa-check" size="lg" />
        <li>GET STAMP</li>
      </a>
      <!-- <a href="">
          <li><i class="fa-solid fa-stamp"></i>STAMP LIST</li>
        </a> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
div.ui-wrapper {
  display: block;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  // background-color: aquamarine;
  z-index: 10;
  div.circle {
    background-color: rgba(50, 50, 50, 0.5);
    // background-color: rgba(250, 250, 250, 0.5);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 2px 2px 2px 0;
    width: 15%;
    border-radius: 0 100% 100% 0%/0 50% 50% 0;
    border: white solid;
    border-width: 2px 2px 2px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: white;
    z-index: 10;
    h1 {
      // transform: translateX(-15px);
      font-size: xx-large;
      padding: 0.5rem;
    }
    p {
      padding: 0.5rem;
      line-height: 30px;
    }
  }
  div#outer-circle {
    // background-color: rgba(50, 50, 50, 0.5);
    z-index: 1;
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: flex-end;
    justify-content: space-around;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 2px 2px 2px 0;
    width: 23%;
    // border-radius:0 100% 100% 0%/0 50% 50% 0;
    // border: white solid ;
    // border-width: 2px 2px 2px 0;
    color: white;
    a {
      display: flex;
      align-items: center;
      width: 180px;
      border-radius: 25px;
      background-color: rgba(240, 240, 240, 0.7);
      box-shadow: inset -5px 5px 10px #5a5a5a, inset 5px -5px 10px #ffffff;
      color: black;
      &:nth-child(1) {
        transform: translateX(47%);
      }
      &:nth-child(2) {
        transform: translateX(85%);
      }
      &:nth-child(3) {
        transform: translateX(85%);
      }
      &:nth-child(4) {
        transform: translateX(47%);
      }
      li {
        list-style: none;
        margin-left: 10px;
      }
      svg {
        border: 2px white solid;
        border-radius: 50%;
        margin-right: 10px;
        padding: 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    div.circle {
      width: 35%;
    }
    div#outer-circle {
      width: 42%;
      a {
        &:nth-child(1) {
          transform: translateX(60%);
        }
        &:nth-child(2) {
          transform: translateX(90%);
        }
        &:nth-child(3) {
          transform: translateX(90%);
        }
        &:nth-child(4) {
          transform: translateX(60%);
        }
      }
    }
  }
}
</style>
