<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RawGood } from '@/types/types'

const route = useRoute()
const router = useRouter()

class Detail {
  goodId: string = ''
  title: string = ''
  type: string = ''
  campus: string = ''
  price: string = ''
  intro: string = ''
  seller: string = ''
}

const detail = ref<Detail>(new Detail())

const tmp = await axios.get(`/api/getGood/${route.params.gid}`)

if (tmp.data as RawGood) {
  detail.value.goodId = route.params.gid as string
  detail.value.title = tmp.data.title
  detail.value.type = tmp.data.category
  detail.value.campus = tmp.data.campus
  detail.value.intro = tmp.data.intro
  detail.value.price = tmp.data.price
  detail.value.seller = tmp.data.seller_id
} else {
  detail.value.goodId = route.params.gid as string
  detail.value.title = (tmp as any).title
  detail.value.type = (tmp as any).type
  detail.value.campus = (tmp as any).campus
  detail.value.intro = (tmp as any).intro
  detail.value.price = (tmp as any).price
}

const buttonText = ref<'立即购买' | '已售出'>('立即购买')

function handlePurchase () {
  if (buttonText.value === '立即购买') {
    buttonText.value = '已售出'

    let date = new Date()
    date.setHours(date.getHours() + 8)

    const order = {
      buyer: '1951001',
      seller: detail.value.seller,
      goodID: detail.value.goodId,
      price: detail.value.price,
      generatedTime: date.toISOString().slice(0, 19).replace('T', ' '),
      stat: '待确认'
    }

    axios.post(`/api/generateOrder`, order)

    router.push('/order')
  }
}
</script>

<template>
  <div class="p-3 flex items-center bg-white flex bg-opacity-80 rounded-md w-150 h-60">
    <img
      src="/8.jpg"
      class="box-border border-2 border-gray-200 w-50"/>
      <div class="flex flex-col justify-start items-center flex-1">
        <div
          data-test="title"
          class="m-0 text-center truncate w-full overflow-hidden truncate px-3 tracking-wider text-base flex-grow-0 text-gray-800 font-bold">{{detail?.title}}</div>
        <div
          class="flex items-center justify-around text-black tracking-wide text-sm mt-2 w-full">
          <div
            class="m-0"
            data-test="type">类型：{{detail?.type}}</div>
          <div
            data-test="campus"
            class="m-0">校区：{{detail?.campus}}</div>
        </div>
        <div
          data-test="intro"
          class="bg-white p-1 text-gray-600 rounded-md box-border w-72 mt-2 text-sm tracking-wide overflow-auto h-14">
          {{detail?.intro}}
        </div>
        <div class="flex justify-around w-full mt-2">
          <div
            data-test="price"
            class="text-orange-500 text-2xl font-bold">￥{{Number.parseFloat(detail?.price).toFixed(2)}}</div>
          <button
            data-test="purchase"
            class="cursor-pointer bg-orange-400 hover:bg-orange-500 active:shadow-inner active:bg-orange-600 text-sm text-white font-medium rounded-sm outline-none p-1 tracking-wide "
            @click="handlePurchase">
            {{buttonText}}
          </button>
        </div>
      </div>
  </div>
</template>

<style scoped>

</style>