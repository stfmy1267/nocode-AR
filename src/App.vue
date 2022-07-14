<script setup lang="ts">
import Header from "./components/Header.vue";
import MainVisual from "./components/MainVisual.vue";
import About from "./components/About.vue";
import Course from "./components/Course.vue";
import SingUp from "./components/SingUp.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <MainVisual class="mb-20" />
    <div class="w-2/3 mx-auto">
      <About class="mb-28"/>
      <h3 class="text-4xl mb-12">Course</h3>
      <p class="text-2xl max-w-xl mb-20">
        2種類のARから選択できるためにお客様の用途・要望にあったARスタンプラリーを提供します。
      </p>
    </div>
    <Course class="mb-28"/>
    <div class="w-3/4 mx-auto mb-28">
      <SingUp />
    </div>
    <Footer />
  </div>
</template>
