<script lang="ts" setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="p-4 box-border h-8 flex justify-evenly items-center gap-10 top-0 left-0 right-0 absolute bg-white bg-opacity-80">
    <router-link to="/">
      Login
    </router-link>    
    <router-link to="/home">
      Home
    </router-link>
    <router-link to="/detail/1">
      Detail
    </router-link>
    <router-link to="/goods">
      Goods
    </router-link>       
    <router-link to="/order">
      Order
    </router-link>    
    <router-link to="/report">
      Report
    </router-link>   
  </div>
</template>

<style scoped>

</style>