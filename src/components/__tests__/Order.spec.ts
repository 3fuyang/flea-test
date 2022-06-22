import OrderVue from "../order/Order.vue"
import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import axios from 'axios'
import { defineComponent } from "vue"
import { mockGetOrders } from "@/mocks/order"

const suspenseOrder = defineComponent({
  components: { OrderVue },
  template: `<Suspense><OrderVue/></Suspense>`
})

vi.spyOn(axios, 'get').mockResolvedValue(mockGetOrders)

const wrapper = mount(suspenseOrder)

await flushPromises()

test('Testing import', async () => {
  expect(wrapper).toBeTruthy()
})

test('Testing list rendering', async () => {
  const orders = wrapper.findAll('[data-test="order"]')

  expect(orders).toHaveLength(3)
})

test('Testing title rendering', async () => {
  const title = wrapper.findAll('[data-test="title"]')

  expect(title[0].text()).toBe('派克威雅XL系列 樱花粉特别款礼盒')
  expect(title[1].text()).toBe('大学物理学 (附)网络课程&配套习题')
  expect(title[2].text()).toBe('Apple iPad Pro 11英寸平板电脑')
})

test('Testing price rendering', async () => {
  const type = wrapper.findAll('[data-test="price"]')

  expect(type[0].text()).toContain('198')
  expect(type[1].text()).toContain('15')
  expect(type[2].text()).toContain('3499')
})

test('Testing status rendering', async () => {
  const stat = wrapper.findAll('[data-test="stat"]')

  expect(stat[0].text()).toContain('待确认')
  expect(stat[1].text()).toContain('已封禁')
  expect(stat[2].text()).toContain('已驳回')
})

test('Testing button behavior', async () => {
  const buttons = wrapper.findAll('[data-test="operate"]')

  expect(buttons[0].text()).toBe('确认订单')

  await buttons[0].trigger('click')

  expect(buttons[0].text()).toBe('举报订单')

  await buttons[0].trigger('click')

  expect(buttons[0].text()).toBe('举报受理中')

  expect(buttons[1].text()).toBe('举报受理')

  await buttons[1].trigger('click')

  expect(buttons[1].text()).toBe('举报受理')

  expect(buttons[2].text()).toBe('举报')

  await buttons[2].trigger('click')

  await flushPromises()

  expect(buttons[2].text()).toBe('举报受理中')
})