<script lang="ts" setup>
import { computed, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Good {
  good_id: string
  image: string
  title: string
  price: string
  category: '图书音像' | '电子产品' | '美妆个护' | '运动户外' | '生活电器' | '其他'
  campus: '嘉定校区' | '四平路校区' | '沪西校区' | '沪北校区'
  intro: string
  available: boolean
}

// 商品ref对象
const goods = ref<Good[]>([])

// 新增商品模态框开关
const uploadModalSwitch = ref(false)

// 打开新增商品模态框
function openUploadModal () {
  uploadModalSwitch.value = true
}

// 当前查看详情的商品ID
const currID = ref('')

// 当前详情的商品
const currGood = computed(() => {
  const results = goods.value.filter((good) => {
    return good.good_id === currID.value
  })
  return results[0]
})

// 商品详情模态框开关
const infoModalSwitch = ref(false)

// 打开商品详情模态框
function showInfoModal (id: string) {
  infoModalSwitch.value = true
  currID.value = id
}

// 新商品信息表单
const newGoodForm = ref({
  image: '',
  title: '',
  price: undefined,
  category: undefined,
  campus: undefined,
  intro: ''
})

// 上架新商品
function addGood () {
  if (newGoodForm.value.title === '') {
    return '请输入商品标题'
  } else if (!newGoodForm.value.price) {
    return '请输入商品价格'
  } else if (!newGoodForm.value.category) {
    return '请选择商品类型'
  } else if (!newGoodForm.value.campus) {
    return '请选择商品校区'
  } else if (!newGoodForm.value.intro) {
    return '请输入商品简介'
  } else {
    const body = [
      '1951001',
      newGoodForm.value.price,
      newGoodForm.value.category,
      newGoodForm.value.title,
      newGoodForm.value.campus,
      newGoodForm.value.intro,
      'default.png'
    ]

    axios.post(`/api/addGood`, body)

    closeModal()

    router.go(0)
  }
}

// 关闭模态框
function closeModal () {
  if (uploadModalSwitch.value) {
    uploadModalSwitch.value = false
    newGoodForm.value.image = ''
    newGoodForm.value.title = ''
    newGoodForm.value.price = undefined
    newGoodForm.value.category = undefined
    newGoodForm.value.campus = undefined
    newGoodForm.value.intro = ''
  } else if (infoModalSwitch.value) {
    infoModalSwitch.value = false
    currID.value = ''
  }
}

// 下架商品
function deleteGood (gid: string) {
  // 调用接口
  axios.get(`/api/delGood/${gid}`)

  router.go(0)
}

const res = await axios.get('/api/getMyGoods/1951001')

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
        class="flex box-border p-3 bg-white rounded-md w-90 h-30 hover:shadow-md transition duration-200 relative">
        <img
          src="/8.jpg"
          class="box-border border-2 border-gray-200 object-fill w-25"/>        
        <div class="ml-2 flex flex-col overflow-hidden flex-1">
          <span class="truncate w-full overflow-hidden">{{good.title}}</span>
          <span class="flex-1"/>
          <span class="text-orange-500 font-semibold">￥{{good.price}}</span>
          <div class="flex justify-around w-full">
            <button
              @click="showInfoModal(good.good_id)"
              data-test="checkDetail"
              class="border-gray-300 hover:text-green-500 hover:border-green-500 button">
              更多信息
            </button>
            <button
              data-test="pullOffShelf"
              @click="deleteGood(good.good_id)"
              class=" border-gray-300 hover:text-blue-500 hover:border-blue-500 button">
              下架商品
            </button>            
          </div>
        </div>
      </div>      
    </div>
    <button
      data-test="addNewGood"
      @click="openUploadModal"
      class="button border-blue-400 absolute bottom-4 right-2 text-blue-400 hover:text-gray-500 hover:border-gray-500">
      新增商品
    </button>    
  </div>
  <teleport to="body">
    <div
      v-if="uploadModalSwitch"
      data-test="intro-modal"
      class="modal">
      <button
        class="button px-2 py-0 hover:text-red-500 hover:border-red-500 self-end"
        @click="uploadModalSwitch = false">
        关闭
      </button>
      <div class="flex gap-2 w-full">
        <span class="font-bold">标题</span>
        <input
          data-test="title"
          class="input"
          v-model="newGoodForm.title"
          placeholder="Title"/>
      </div>
      <div class="flex gap-2 w-full">
        <span class="font-bold">价格</span>
        <input
          data-test="price"
          class="input"
          v-model="newGoodForm.price"
          placeholder="Price"/>
      </div>   
      <div class="flex gap-2 w-full">
        <span class="font-bold">分类</span>
        <input
          data-test="category"
          class="input"
          v-model="newGoodForm.category"
          placeholder="Category"/>        
      </div>
      <div class="flex gap-2 w-full">
        <span class="font-bold">校区</span>
        <input
          data-test="campus"
          class="input"
          v-model="newGoodForm.campus"
          placeholder="Campus"/>        
      </div> 
      <div class="input-wrapper">
        <span class="font-bold">介绍</span>
        <textarea
          data-test="intro"
          class="input"
          v-model="newGoodForm.intro"
          placeholder="intro"/>        
      </div> 
      <button
        @click="addGood"
        class="button hover:text-green-500 hover:border-green-500">
        添加商品
      </button>                             
    </div>
    <div
      v-if="infoModalSwitch"
      data-test="infoModal"
      class="modal">
      <div class="input-wrapper">
        <p class="font-bold text-base">标题：</p>
        <p class="text-dark-50 hover:underline hover:text-gray-500">{{currGood.title}}</p>
      </div>
      <div class="input-wrapper">
        <p class="font-bold text-base">价格：</p>
        <p class="text-orange-500 hover:underline hover:text-orange-400 font-bold">￥{{Number.parseFloat(currGood.price).toFixed(2)}}</p>
      </div>  
      <div class="input-wrapper">
        <p class="font-bold text-base">分类：</p>
        <p class="text-dark-50 hover:underline hover:text-gray-500">{{currGood.category}}</p>
      </div>          
      <div class="input-wrapper">
        <p class="font-bold text-base">校区：</p>
        <p class="text-dark-50 hover:underline hover:text-gray-500">{{currGood.campus}}</p>
      </div>     
      <div class="input-wrapper">
        <p class="font-bold text-base">介绍：</p>
        <p class="text-dark-50 hover:underline hover:text-gray-500">{{currGood.intro}}</p>
      </div>        
    </div>
    <div v-if="uploadModalSwitch || infoModalSwitch" class="absolute top-0 bottom-0 left-0 right-0 bg-dark-50 opacity-25" @click="closeModal"/>
  </teleport>
</template>

<style scoped>
.modal {
  @apply z-10 flex flex-col items-center bg-white box-border border-1 border-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-md;
}

.button {
  @apply outline-none  rounded-md border-1 p-1 transition-colors duration-200;
}

.input {
  @apply px-1 text-base outline-none rounded-md border-gray-400 focus:outline-blue-400 border-1 flex-1 m-b-1;
}

.input-wrapper {
  @apply flex w-full items-center;
}
</style>