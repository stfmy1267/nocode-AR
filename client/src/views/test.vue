<script setup>
import { useStore } from 'vuex'
const store = useStore()

let user = store.state

</script>

<template>
  <div>
    <h1>{{ user }}</h1>
  </div>
</template>
