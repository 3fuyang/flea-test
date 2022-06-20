<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'

interface GoodInfo {
  good_id: string
  images: string
  price: string
  title: string
}

const goodsList = ref<GoodInfo[]>()

const tmp = await axios.get('/api/getTrends')

if (Array.isArray(tmp)) {
  goodsList.value = tmp
} else {
  goodsList.value = [...tmp.data, ...tmp.data]
}

// 表单容器
const main = ref<null | HTMLElement>()

function scrollToTop () {
  if (main.value) {
    main.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

</script>

<template>
  <div class="p-3 flex items-center bg-white flex-col bg-opacity-80 rounded-md gap-2 w-100 h-160">
    <p class="m-0 text-lg font-bold tracking-wide text-center">Home</p>
    <div
      class="flex flex-col h-full overflow-auto gap-3 relative"
      ref="main"
      data-test="main">
      <div
        v-for="good in goodsList"
        data-test="good"
        class="flex box-border p-3 bg-white rounded-md w-90 h-30 hover:shadow-md transition duration-200 cursor-pointer relative">
        <img
          src="/8.jpg"
          class="box-border border-2 border-gray-200 object-fill w-25"/>
        <section class="relative text-sm tracking-wider overflow-hidden flex-1">
          <p class="m-0 truncate w-full overflow-hidden px-3 absolute top-0">{{good.title}}</p>
          <p class="m-0 text-lg text-orange-500 font-semibold absolute bottom-0 left-1/3">￥{{Number.parseFloat(good.price).toFixed(2)}}</p>
        </section>
      </div>
      <div
        @click="scrollToTop"
        data-test="affix"
        class="rounded hover:shadow-lg box-border border-1 border-gray-200 duration-200 tracking-wider text-white flex justify-center items-center transition-shadow sticky bottom-5 left-4/5 text-sm px-1 py-2 bg-blue-500 w-10 font-bold cursor-pointer ">
        TOP
      </div>      
    </div>
  </div>
</template>

<style scoped>

</style>