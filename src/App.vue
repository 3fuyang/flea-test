<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNav from './components/public/TopNav.vue'
</script>

<template>
  <div class="bg-gradient-to-tr from-green-500 via-blue-500 to-purple-500 w-full h-screen flex flex-col justify-center items-center relative">
    <top-nav/>
    <router-view/>
  </div>
</template>

<style>

</style>
