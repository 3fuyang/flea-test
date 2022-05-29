<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'

interface GoodInfo {
  id: string
  title: string
  price: number
}

const goodsList = ref<GoodInfo[]>()

goodsList.value = await axios.get('/api/goods')
</script>

<template>
  <div class="p-3 flex items-center bg-white flex-col bg-opacity-80 rounded-md gap-2 w-100 h-160">
    <p class="m-0 text-lg font-bold tracking-wide text-center">Home</p>
    <main class="flex flex-col h-full overflow-auto gap-3">
      <div
        v-for="good in goodsList"
        data-test="good"
        class="flex box-border p-3 bg-white rounded-md w-90 h-30 hover:shadow-md transition duration-200 cursor-pointer">
        <img
          src="/8.jpg"
          class="box-border border-2 border-gray-200 object-fill w-25"/>
        <section class="relative text-sm tracking-widest overflow-hidden flex-1">
          <p class="m-0 truncate w-full overflow-hidden truncate px-3 absolute top-0">{{good.title}}</p>
          <p class="m-0 text-lg text-orange-500 font-semibold absolute bottom-0 left-1/3">￥{{good.price.toFixed(2)}}</p>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>