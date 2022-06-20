<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

interface Good {
  id: string
  image: string
  title: string
  price: string
  category: '图书音像' | '电子产品' | '美妆个护' | '运动户外' | '生活电器' | '其他'
  campus: '嘉定校区' | '四平路校区' | '沪西校区' | '沪北校区'
  info: string
  available: boolean
}

const goods = ref<Good[]>([])

const uploadModalSwitch = ref(false)

function openUploadModal () {
  uploadModalSwitch.value = true
}

const currID = ref('')

// 新商品信息表单
const newGoodForm = ref({
  image: '',
  title: '',
  price: undefined,
  category: undefined,
  campus: undefined,
  info: ''
})

const res = await axios.get('/api/getTrends')

if (res.data) {
  goods.value.push(...res.data)
}
</script>

<template>
  <div class="relative p-3 flex items-center bg-white flex-col bg-opacity-80 rounded-md gap-2 w-100 h-160">
    <p class="m-0 text-lg font-bold tracking-wide text-center">Goods</p>
    <div
      class="flex flex-col h-130 overflow-auto gap-3 relative">
      <div
        v-for="good in goods"
        data-test="good"
        class="flex box-border p-3 bg-white rounded-md w-90 h-30 hover:shadow-md transition duration-200 cursor-pointer relative">
        <img
          src="/8.jpg"
          class="box-border border-2 border-gray-200 object-fill w-25"/>        
        <div class="ml-2 flex flex-col overflow-hidden flex-1">
          <span class="truncate w-full overflow-hidden">{{good.title}}</span>
          <span class="flex-1"/>
          <span class="text-orange-500 font-semibold">￥{{good.price}}</span>
          <div class="flex justify-around w-full">
            <button
              data-test="checkDetail"
              class="rounded-md outline-none text-sm border-gray-300 border-1 box-border p-1 hover:text-green-500 hover:border-green-500 transition-colors duration-200">
              更多信息
            </button>
            <button
              data-test="pullOffShelf"
              class="rounded-md outline-none text-sm border-gray-300 border-1 box-border p-1 hover:text-blue-500 hover:border-blue-500 transition-colors duration-200">
              下架商品
            </button>            
          </div>
        </div>
      </div>      
    </div>
    <button
      data-test="addNewGood"
      @click="openUploadModal"
      class="absolute bottom-4 right-2 outline-none border-blue-400 rounded-md border-1 p-1 text-blue-400 hover:text-gray-500 hover:border-gray-500 transition-colors duration-200">
      新增商品
    </button>    
  </div>
  <teleport to="body">
    <div
      v-if="uploadModalSwitch"
      data-test="info-modal"
      class="flex flex-col items-center bg-white box-border border-1 border-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-sm">
      <button @click="uploadModalSwitch = false">×</button>
      <span class="font-bold">标题</span>
      <input
        data-test="username"
        class="px-1 outline-none rounded-md border-gray-400 focus:outline-blue-400"
        v-model="username"
        placeholder="Username"/>
    </div>
  </teleport>
</template>

<style scoped>

</style>