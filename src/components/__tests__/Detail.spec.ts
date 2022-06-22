import DetailVue from "../detail/Detail.vue"
import { test, expect, vi } from 'vitest'
import { flushPromises, mount } from "@vue/test-utils"
import axios from 'axios'
import { mockGetDetail } from '@/mocks/detail'
import { defineComponent } from "vue"

vi.spyOn(axios, 'get').mockResolvedValue(mockGetDetail)

vi.spyOn(axios, 'post').mockResolvedValue(true)

vi.mock('vue-router', () => ({
  useRoute: vi.fn().mockImplementation(() => ({
    params: {
      gid: 1
    }
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

const SuspenseDetail = defineComponent({
  components: { DetailVue },
  template: `<Suspense><DetailVue/></Suspense>`
})

const wrapper = mount(SuspenseDetail)

await flushPromises()

test('Testing import', async () => {
  expect(wrapper).toBeTruthy()
})

test('Testing title rendering', async () => {
  const title = wrapper.find('[data-test="title"]')

  expect(title.text()).toBe('套装 JavaScript入门 《JS高级程序设计》《JS DOM编程艺术》《你不知道的JS》')
})

test('Testing type rendering', async () => {
  const type = wrapper.find('[data-test="type"]')

  expect(type.text()).toContain('图书音像')
})

test('Testing campus rendering', async () => {
  const campus = wrapper.find('[data-test="campus"]')

  expect(campus.text()).toContain('嘉定校区')
})

test('Testing intro rendering', async () => {
  const type = wrapper.find('[data-test="intro"]')

  expect(type.text()).toBe('Web开发教程书籍，JavaScript开发入门到实战图书，零基础自学JS，打通JavaScript的任督二脉，助力js技能提升')
})

test('Testing button rendering', async () => {
  const purchase = wrapper.find('[data-test="purchase"]')

  expect(purchase.text()).toBe('立即购买')
})

test('Testing button event', async () => {
  const purchase = wrapper.find('[data-test="purchase"]')

  await purchase.trigger('click')

  expect(purchase.text()).toBe('已售出')
})