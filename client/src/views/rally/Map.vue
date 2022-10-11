<script setup>
import RallyBottomMenu from '../../components/layouts/rally/RallyBottomMenu.vue';
import { onMounted } from 'vue'
import L from 'leaflet'
// let lat = ref()
// let lng = ref()

let spotsLocation = [
  {
    lat:38.88061039150165,
    lng:139.83398437500003
  },
  {
    lat:45.02695045318546,
    lng:134.16503906250003
  },
  {
    lat:35.639441068973944,
    lng:139.52636718750003

  },
  {
    lat:32.54681317351517,
    lng:131.61621093750003
  },
  {
    lat:35.85343961959182,
    lng:136.66992187500003
  },
  {
    lat:40.64730356252251,
    lng:140.80078125000003
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

  // クリックで緯度経度表示
  let threshold = 30;
  let marker,circle;
  // map.on('click', (e) => {
  //   if (marker) map.removeLayer(marker) //マーカー削除
  //   marker = L.marker(e.latlng).addTo(map) //マーカー追加
  //   marker.bindPopup('緯度:' + e.latlng.lat + '<br>経度:' + e.latlng.lng).openPopup()
  //   lat.value = e.latlng.lat
  //   lng.value = e.latlng.lng
  // })

  // スポットのマーカーを追加
  spotsLocation.forEach(element => {
    L.marker([element.lat, element.lng]).addTo(map).bindPopup(`${element.lat}, ${element.lng}`)
    // L.latLng(element.lat, element.lng);
  });
// let a = L.marker([38.7000547037002, 139.884302222165]).addTo(map).bindPopup('<img src="../AR/img/MainImg-2.jpg" style="width:150px;"><br/>' + "松ヶ岡本殿");
// a = L.latLng(38.7000547037002, 139.884302222165);

  // 現在位置の取得と追跡
  const onLocationFound = (e) => {
    let radius = e.accuracy/2;
    if (marker) map.removeLayer(marker); //マーカー削除
    marker = L.marker(e.latlng).addTo(map); //マーカー追加
    marker.bindPopup('現在地').openPopup();
    if (circle) map.removeLayer(circle);
    circle = L.circle(e.latlng, radius).addTo(map);
    map.setView(e.latlng);

    spotsLocation.forEach(element => {
      L.marker([element.lat, element.lng]).addTo(map).bindPopup(`${element.lat}, ${element.lng}`)
      let spot = L.latLng(element.lat, element.lng);
      if (spot.distanceTo(e.latlng) < threshold) {
        window.location.href=('https://www.yatex.org/gitbucket/Fumiya238/AR-project/pages/AR/AR-location1.html');
      }
    });
  };
  // 位置情報を持ってくる関数
  const watchFound = (e) => {
    onLocationFound({
    latlng: L.latLng(
      [
        e.coords.latitude, e.coords.longitude
      ]
    ),
    accuracy: e.coords.accuracy
    });
  }

  const onMapClick = (e) => {
    if (marker) map.removeLayer(marker);
    marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup('現在地').openPopup();
    if (circle) map.removeLayer(circle);
    circle = L.circle(e.latlng).addTo(map);
    map.setView(e.latlng);
    // 50メートル以内に近づいた時の処理
    spotsLocation.forEach(element => {
      L.marker([element.lat, element.lng]).addTo(map).bindPopup(`${element.lat}, ${element.lng}`)
      let spot = L.latLng(element.lat, element.lng);
      if (spot.distanceTo(e.latlng) < threshold) {
        window.location.href=('https://www.yatex.org/gitbucket/Fumiya238/AR-project/pages/AR/AR-location1.html');
      }
    });
  }

  // 位置情報取得失敗
  const onLocationError = (e) => alert(e.message);

  navigator.geolocation.watchPosition(watchFound,onLocationError)
  // デバック
  map.on('click',onMapClick)
})
</script>

<template>
  <div>
    <button class="border-solid border-2">
      ずる
    </button>
    <!--<div class="seach absolute top-2 ">
      <form action="">
        <textarea cols="30" rows="1" />
      </form>
    </div>-->
    <div class="w-full h-full">
      <div id="map" class="h-[500px]" />
    </div>
    <RallyBottomMenu />
  </div>
</template>
