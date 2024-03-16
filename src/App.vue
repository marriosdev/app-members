<script setup>
import Loader from "@/components/Loader.vue";
import store from "@/store/store.js";
</script>

<template>
    <router-view v-if="!store.loading"></router-view>
    <Loader v-if="store.loading" />
</template>
