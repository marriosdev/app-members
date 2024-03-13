<script setup>
import Loader from "@/components/Loader.vue";
import store from "@/store/store.js";
</script>

<template>
  <main>
    <router-view v-if="!store.loading"></router-view>
    <Loader v-if="store.loading" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
i {
  font-size: 2rem;
}
body {
  background: white !important;
}
</style>

