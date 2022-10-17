<script setup></script>

<template>
  <a-scene>
    <a-plane
      position="0 0 -3" color="black" rotation="-90 0 0"
      scale="30 30 30"
    />
    <a-entity gltf-model="#box" scale="1 1 1" position="0 3 -7" />
    <a-box
      scale="1 1 1"
      position="1 0.5 -3"
      color="red"
      event-set__click="material.color: blue"
      event-set__mouseleave="material.color: red;"
    />
    <!-- Camera + cursor. -->
    <a-entity camera position="0 1.6 0">
      <a-camera position="0 0 0">
        <a-entity cursor="rayOrigin: mouse" />
        <!-- /cursor -->
      </a-camera>
      <!-- /camera -->
    </a-entity>
  </a-scene>
</template>
