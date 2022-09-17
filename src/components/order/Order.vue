<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue'

interface Order {
  oid: string
  gid: string
  price: string
  title: string
  time: string
  status: '待确认' | '已完成' | '待处理' | '已驳回' | '已封禁'
}

const orderList = ref<Order[]>([])

const tmp = await axios.get('/api/getOrders/1951001')

if (tmp.data) {
  tmp.data.forEach((order: any) => {
    orderList.value.push({
      oid: order.order_id,
      gid: order.good_id,
      price: order.price,
      title: order.title,
      time: order.generated_time.replace('T', ' '),
      status: '待确认'   
    })
  })
} else {
  (tmp as any).forEach((order: Order) => {
    orderList.value.push(order)
  })
}

function getButtonText (stat: Order['status']) {
  switch (stat) {
    case '待确认':
      return '确认订单'
    case '已完成':
      return '举报订单'
    case '待处理':
      return '举报受理中'
    case '已封禁':
      return '举报受理'
    case '已驳回':
      return '举报'
  }
}

function handleClick (order: Order) {
  switch (order.status) {
    case '待确认':
      order.status = '已完成'      
      // 调用接口：修改订单状态为已完成
      axios.get(`/api/confirmOrder/${order.oid}`)
      break
    case '已完成':
      order.status = '待处理'
      // 调用接口：为该订单生成举报数据 
      let body = {
        orderID: order.oid,
        reason: 'Not good'
      }      
      axios.post(`/api/reportOrder`, body)
        .then((res) => {
          if (res.data === true) {
            return
          } else {
            console.log(res)
          }
        })
      break
    case '待处理':
      break
    case '已封禁':
      break
    case '已驳回':
      // 调用接口：修改举报状态为“待处理”
      axios.get(`/api/restartReport/${order.oid}`)
      order.status = '待处理'
      break
  }
}
</script>

<template>
  <div class="p-3 flex items-center bg-white flex-col bg-opacity-80 rounded-md gap-2 w-100 h-160">
    <p class="m-0 text-lg font-bold tracking-wide text-center">Order</p>
    <div
      class="flex flex-col h-full overflow-auto gap-3 relative"
      ref="main"
      data-test="main">
      <div
        v-for="order in orderList"
        data-test="order"
        class="flex box-border p-3 bg-white rounded-md w-90 h-20 transition duration-200 relative">
        <img
          src="/8.jpg"
          class="box-border border-2 border-gray-200 object-fill w-15"/>
        <div class="flex flex-col w-full items-center">
          <div
            data-test="title"
            class="m-0 text-center text-xs traking-wide w-full truncate">{{order.title}}</div>
          <div class="flex justify-around w-full flex-1">
            <p
              data-test="price"
              class="text-orange-400 text-xs tracking-wide m-0">￥{{Number.parseFloat(order.price).toFixed(2)}}</p>
            <p class="m-0 text-xs text-gray-400">{{order.time}}</p>
          </div>
          <div class="flex justify-around w-full">
            <p
              data-test="stat"
              class="text-xs w-18 text-gray-500 text-center">状态：{{order.status}}</p>
            <button
              data-test="operate"
              class="hover:shadow-sm hover:text-green-500 hover:border-green-500 transition-colors transition-shadow duration-200 text-xs outline-none bg-white box-border tracking-wide border-gray-500 border-1 w-16 rounded-md"
              @click="handleClick(order)">
              {{getButtonText(order.status)}}
            </button>
          </div>
        </div>
      </div>         
    </div>  
  </div>
</template>

<style scoped>

</style>