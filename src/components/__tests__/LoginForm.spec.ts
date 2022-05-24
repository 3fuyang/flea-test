import LoginForm from "../login/LoginForm.vue"
import { describe, test, expect } from "vitest"
import { mount } from "@vue/test-utils"

describe('Login Component Testing', () => {
  expect(LoginForm).toBeTruthy()

  const wrapper = mount(LoginForm)
  
  test('Check type radio interface', async () => {
    const member = wrapper.get('[data-test="member"]')
    const admin = wrapper.get('[data-test="admin"]')

    await admin.trigger('click')

    expect((admin.element as HTMLInputElement).checked).toBe(true)
    expect((member.element as HTMLInputElement).checked).toBe(false)
  })

  test('Check form input inferface', async () => {
    const username = wrapper.get('[data-test="username"]')
    const password = wrapper.get('[data-test="password"]')

    await username.setValue('1951001')
    await password.setValue('qwe12345')

    expect((username.element as HTMLInputElement).value).toBe('1951001')
    expect((password.element as HTMLInputElement).value).toBe('qwe12345')
  })

  test('check login button interface', async () => {
    const password = wrapper.get('[data-test="password"]')
    const button = wrapper.get('[data-test="button"]')

    await password.setValue('')
    await button.trigger('click')
    
    expect(wrapper.emitted('click')).toHaveLength(2)
    expect(wrapper.find('[data-test="info"]').exists()).toBe(true)
  })

  test.todo('check login http request', async () => {

  })
})