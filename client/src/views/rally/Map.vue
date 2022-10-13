<script setup>
import RallyBottomMenu from '../../components/layouts/rally/RallyBottomMenu.vue'
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass, faXmark, faArrowUp)

let spotsLocation = [
  {
    spot_name: '１個目の場所',
    lat: 38.88061039150165,
    lng: 139.83398437500003,
  },
  {
    spot_name: '２個目の場所',
    lat: 45.02695045318546,
    lng: 134.16503906250003,
  },
  {
    spot_name: '３個目の場所',
    lat: 35.639441068973944,
    lng: 139.52636718750003,
  },
  {
    spot_name: '４個目の場所',
    lat: 32.54681317351517,
    lng: 131.61621093750003,
  },
  {
    spot_name: '５個目の場所',
    lat: 35.85343961959182,
    lng: 136.66992187500003,
  },
  {
    spot_name: '６個目の場所',
    lat: 40.64730356252251,
    lng: 140.80078125000003,
  },
]

onMounted(() => {
  // 初期設定
  let map = L.map('map').fitWorld()
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map)
  map.setView([38.575, 136.984], 5)

  let searchLayer = new L.LayerGroup()
  map.addLayer(searchLayer)

  // クリックで緯度経度表示
  let threshold = 30
  let marker, circle

  // 現在位置の取得と追跡
  const onLocationFound = (e) => {
    let radius = e.accuracy / 2
    if (marker) map.removeLayer(marker) //マーカー削除
    marker = L.marker(e.latlng).addTo(map) //マーカー追加
    marker.bindPopup('現在地').openPopup()
    if (circle) map.removeLayer(circle)
    circle = L.circle(e.latlng, radius).addTo(map)
    map.setView(e.latlng, 13)

    spotsLocation.forEach((element) => {
      L.marker([element.lat, element.lng]).addTo(map).bindPopup(element.spot_name)
      let spot = L.latLng(element.lat, element.lng)
      if (spot.distanceTo(e.latlng) < threshold) {
        window.location.href = 'https://www.yatex.org/gitbucket/Fumiya238/AR-project/pages/AR/AR-location1.html'
      }
    })
  }
  // 位置情報を持ってくる関数
  const watchFound = (e) => {
    onLocationFound({
      latlng: L.latLng([e.coords.latitude, e.coords.longitude]),
      accuracy: e.coords.accuracy,
    })
  }

  // const onMapClick = (e) => {
  //   if (marker) map.removeLayer(marker)
  //   marker = L.marker(e.latlng).addTo(map)
  //   marker.bindPopup('現在地').openPopup()
  //   if (circle) map.removeLayer(circle)
  //   circle = L.circle(e.latlng).addTo(map)
  //   map.setView(e.latlng)
  //   // 50メートル以内に近づいた時の処理
  //   spotsLocation.forEach((element) => {
  //     L.marker([element.lat, element.lng]).addTo(map).bindPopup(`${element.lat}, ${element.lng}`)
  //     let spot = L.latLng(element.lat, element.lng)
  //     if (spot.distanceTo(e.latlng) < threshold) {
  //       window.location.href = 'https://www.yatex.org/gitbucket/Fumiya238/AR-project/pages/AR/AR-location1.html'
  //     }
  //   })
  // }

  // 位置情報取得失敗
  const onLocationError = (e) => alert(e.message)

  navigator.geolocation.watchPosition(watchFound, onLocationError)

  const searchIcon = window.document.getElementById('search-icon')
  searchIcon.addEventListener('click', () => {
    spotsLocation.forEach((element) => {
      if (element.spot_name === search.value) {
        map.setView([element.lat, element.lng], 15)
        closeSearch()
      }
    })
  })
})

let isActive = ref(false)
let search = ref('')

const clickList = (e) => {
  search.value = e.target.innerText
}

const closeSearch = () => {
  search.value = ''
  isActive.value = false
}
const openSearch = () => {
  isActive.value = true
}
</script>

<template>
  <div>
    <!--<button class="border-solid border-2">ずる</button>-->
    <div class="w-full h-full">
      <div id="map" class="w-full absolute top-0 left-0 right-0 bottom-0" />
      <div class="absolute flex w-5/6 z-[600] top-4 left-16">
        <form class="w-full" @submit.prevent="searchSpot($event)">
          <input
            id="search-text"
            v-model="search"
            type="text"
            name="text"
            placeholder="search"
            :class="{ open_form: isActive, close_form: !isActive }"
          >
          <font-awesome-icon
            id="search-icon"
            size="lg"
            icon="fa-solid fa-magnifying-glass"
            class="mt-1 cursor-pointer"
            :class="{ '-translate-x-9 ': isActive }"
            type="submit"
            @click="openSearch()"
          />
        </form>
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          size="xl"
          class="mt-2 -translate-x-5 cursor-pointer"
          :class="{ hidden: !isActive }"
          @click="closeSearch()"
        />
      </div>
      <div
        class="search z-[500] absolute top-0 w-full flex flex-col items-stretch overflow-auto bg-gray-400 opacity-75"
        :class="{ 'h-0': !isActive, 'pt-16': isActive }"
      >
        <!--<ul v-for="">
          <li>{{ "spot" }}</li>
        </ul>-->
        <ul v-for="(spotLocation, index) in spotsLocation" :key="index" class="w-5/6">
          <li class="flex justify-between" @click="clickList($event)">
            {{ spotLocation.spot_name }}
            <font-awesome-icon icon="fa-solid fa-arrow-up" class="ransform -rotate-45" />
          </li>
        </ul>
      </div>
    </div>
    <RallyBottomMenu />
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: calc(100vh - 64px);
}

input.open_form {
  visibility: visible;
  max-width: 83.333333%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition: 5s ease;
}
input.close_form {
  visibility: hidden;
  width: 0%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition: 2ms;
}

li {
  position: relative;
  list-style: none;
  width: 80%;
  left: 4rem;
  padding: 0.7rem;
  cursor: pointer;
  border: 2px 0 2px 0 solid;
  color: black;
  font-weight: 500;
  &:hover {
    color: blue;
  }
}
.search {
  max-height: calc(100vh - 64px);
}
</style>
