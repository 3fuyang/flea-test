<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'

interface Report {
  time: string
  no: string
  orderID: string
  buyerID: string
  sellerID: string
  status: '待处理' | '已封禁' | '已驳回'
}

const reportList = ref<Report[]>([])

function banReport (report: Report) {
  if (report.status === '待处理') {
    report.status = '已封禁'
  }
}

function rejectReport (report: Report) {
  if (report.status === '待处理') {
    report.status = '已驳回'
  }
}

const tmp = await axios.get(`/api/getAdminName/1`)

if (tmp.data) {
  tmp.data.forEach((report: Report) => {
    reportList.value.push(report)
  })
} else {
  (tmp as any).forEach((report: Report) => {
    reportList.value.push(report)
  })
}
</script>

<template>
  <div class="p-3 flex items-center bg-white flex-col bg-opacity-80 rounded-md gap-2 w-100 h-160">
    <p class="m-0 text-lg font-bold tracking-wide text-center">Report</p>
    <div class="flex justify-around w-full">
      <p>ID</p>
      <p>Seller</p>
      <p>Buyer</p>
      <p>Status</p>
      <p>Operation</p>
    </div>
    <div
      class="flex flex-col h-full overflow-auto gap-3 relative"
      ref="main"
      data-test="main">
      <div
        v-for="report in reportList"
        data-test="report"
        class="flex flex-col bg-white box-border p-3 rounded-md w-90">
        <div class="flex justify-around h-6 transition duration-200 relative">
          <p class="label">{{report.no}}</p>
          <p
            data-test="sellerID"
            class="label">{{report.sellerID}}</p>
          <p
            data-test="buyerID"
            class="label">{{report.buyerID}}</p>
          <p
            data-test="status"
            class="label">{{report.status}}</p>
        </div>
        <div class="flex justify-end gap-4">
          <button
            data-test="ban"
            class="outline-none bg-red-500 rounded-md border-gray-200 border-1 px-3 py-0 text-white hover:bg-red-600"
            :class="report.status !== '待处理' ? 'disabled' : ''"
            @click="banReport(report)">
            {{report.status === '待处理' ? '封禁' : '已处理'}}
          </button>
          <button
            data-test="reject"
            class="outline-none bg-yellow-500 rounded-md border-gray-200 border-1 px-3 py-0 text-white hover:bg-yellow-600"
            :class="report.status !== '待处理' ? 'disabled' : ''"
            @click="rejectReport(report)">
            {{report.status === '待处理' ? '驳回' : '已处理'}}
          </button>          
        </div>
      </div>         
    </div>  
  </div>
</template>

<style scoped>
.label {
  @apply m-0 text-gray-700 tracking-wide;
}

.disabled {
  @apply bg-gray-400;
}
</style>