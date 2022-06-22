<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

function logout () {
  router.push('/')
}
</script>

<template>
  <div class="p-4 box-border h-8 flex justify-evenly items-center gap-10 top-0 left-0 right-0 absolute bg-white bg-opacity-80">
    <router-link to="/">
      LogIn
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
    <button
      @click="logout"
      data-test="logOut"
      class="shadow-lg outline-none px-2 py-0 rounded-md bg-red-500 text-red-50 tracking-wider hover:bg-red-600 hover:text-white box-border border-light-100 border-1 transition-all duration-200">
      LogOut
    </button> 
  </div>
</template>

<style scoped>

</style>