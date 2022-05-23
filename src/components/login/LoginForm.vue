<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

const type = ref<'member' | 'admin'>('member')

const username = ref('')

const password = ref('')

const message = ref('')

function validate () {
  if (!username.value) {
    message.value = '请输入账号'
  } else if (type.value === 'member' && username.value.length !== 7) {
    message.value = '普通用户账号应长7位'
  } else if (type.value === 'admin' && username.value.length !== 4) {
    message.value = '管理员账号应长4位'
  } else if (!password.value) {
    message.value = '请输入密码'
  } else {
    return true
  }
  return false
}

async function handleLogin () {
  if(validate()) {
    const id_pwd = {
      id: username.value,
      password: password.value
    }
    switch (type.value) {
      case 'member': {
        const is_e = await axios.post(`/api/userlogin`, id_pwd)
        if (is_e.data) {
          message.value = '用户登录成功'
        } else {
          message.value = '账号或密码错误'
        }
        break
      }
      case 'admin': {
        const is_e = await axios.post(`/api/adminlogin`, id_pwd)
        if (is_e.data) {
          message.value = '管理员登录成功'
        } else {
          message.value = '账号或密码错误'
        }    
        break    
      }
    }
  }
}
</script>

<template>
  <div class="p-3 flex justify-center items-center bg-white flex-col bg-opacity-80 rounded-md gap-2 w-100">
    <p class="m-0 text-lg font-bold tracking-wide text-center">登录</p>
    <fieldset class="flex justify-center gap-6.4 items-center">
      <span class="font-bold">类型</span>
      <input data-test="member" type="radio" id="member" v-model="type" name="type" value="member" />
      <label for="member">用户</label>
      <input data-test="admin" type="radio" id="admin" v-model="type" name="type" value="admin" />
      <label for="admin">管理员</label>
    </fieldset>
    <fieldset class="flex justify-center gap-5">
      <span class="font-bold">账号</span>
      <input data-test="username" class="px-1 outline-none rounded-md border-gray-400 focus:outline-blue-400" v-model="username" placeholder="Username"/>
    </fieldset>
    <fieldset class="flex justify-center gap-5">
      <span class="font-bold">密码</span>
      <input data-test="password" type="password" class="px-1 outline-none rounded-md border-gray-400 focus:outline-blue-400" v-model="password" placeholder="Password"/>
    </fieldset>
    <div data-test="info" class="text-red-500">{{message}}</div>
    <button
      data-test="button"
      class="btn btn-green w-16"
      @click="handleLogin">登录</button>  
  </div>
</template>

<style scoped>
  .btn {
    @apply py-2 px-4 font-semibold rounded-lg shadow-md;
  }
  .btn-green {
    @apply text-white bg-green-500 hover:bg-green-700;
  }
</style>