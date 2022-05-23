import LoginForm from "../login/LoginForm.vue"
import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"

// Arange, act, assert
test('Login', async () => {
  expect(LoginForm).toBeTruthy()

  const wrapper = mount(LoginForm)
  const username = wrapper.get('[data-test="username"]')
  const password = wrapper.get('[data-test="password"]')
  const login = wrapper.get('[data-test="button"]')
  const info = wrapper.get('[data-test="info"]')

  await username.setValue('1951')
  await password.setValue('qwe12345')
  await login.trigger('click')

  expect(info.text()).toBe('普通用户账号应长7位')
})