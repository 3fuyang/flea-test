<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

class Detail {
  goodId: string = ''
  title: string = ''
  type: string = ''
  campus: string = ''
  price: string = ''
  intro: string = ''
}

const detail = ref<Detail>(new Detail())

const tmp = await axios.get(`/api/getGoods/${route.params.gid}`)
if (tmp.data) {
  detail.value.goodId = route.params.gid as string
  detail.value.title = tmp.data.title
  detail.value.type = tmp.data.category
  detail.value.campus = tmp.data.campus
  detail.value.intro = tmp.data.intro
}
</script>

<template>
  <div class="p-3 flex items-center bg-white flex bg-opacity-80 rounded-md gap-2 w-150 h-60">
    <img
      src="/8.jpg"
      class="box-border border-2 border-gray-200 w-50"/>
      <div class="flex flex-col">
        <p class="">{{detail?.title}}</p>
      </div>
  </div>
</template>

<style scoped>

</style>