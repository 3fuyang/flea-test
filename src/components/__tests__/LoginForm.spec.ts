import LoginForm from "../login/LoginForm.vue"
import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import axios from 'axios'

vi.spyOn(axios, 'post').mockResolvedValue(true)

vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: vi.fn()
  }))
}))

expect(LoginForm).toBeTruthy()

const wrapper = mount(LoginForm)

test('Check interface of type radios', async () => {
  const member = wrapper.get('[data-test="member"]')
  const admin = wrapper.get('[data-test="admin"]')

  await admin.trigger('click')

  expect((admin.element as HTMLInputElement).checked).toBe(true)
  expect((member.element as HTMLInputElement).checked).toBe(false)
})

test('Check interface of form inputs', async () => {
  const username = wrapper.get('[data-test="username"]')
  const password = wrapper.get('[data-test="password"]')

  await username.setValue('1951001')
  await password.setValue('qwe12345')

  expect((username.element as HTMLInputElement).value).toBe('1951001')
  expect((password.element as HTMLInputElement).value).toBe('qwe12345')
})

test('Check login validation', async () => {
  const member = wrapper.get('[data-test="member"]')
  const username = wrapper.get('[data-test="username"]')
  const password = wrapper.get('[data-test="password"]')
  const button = wrapper.get('[data-test="button"]')

  await member.trigger('click')
  await username.setValue('1951001')
  await password.setValue('')
  await button.trigger('click')

  expect(wrapper.find('[data-test="info"]').text()).toBe('请输入密码')
})

test('Check login http request', async () => {
  const member = wrapper.get('[data-test="member"]')
  const username = wrapper.get('[data-test="username"]')
  const password = wrapper.get('[data-test="password"]')
  const button = wrapper.get('[data-test="button"]')
  //const response = wrapper.get('[data-test="res"]')

  await member.trigger('click')
  await username.setValue('1951001')
  await password.setValue('qwe12345')
  await button.trigger('click')

  // mocks已经能拦截到axios请求，flushPromises 疑似没有作用，导致断言无法在 DOM 更新后才执行
  // 考虑采用其他清洗promises的方法
  await flushPromises()

  const info = wrapper.find('[data-test="info"]')
  expect(info.text()).toBe('用户登录成功')
})
