import HomeVue from "../home/Home.vue"
import { test, expect, describe, vi } from 'vitest'
import { flushPromises, mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import axios from 'axios'
import { mockGetGoods } from '@/mocks/goods'
import { useRouter } from 'vue-router'

vi.spyOn(axios, 'get').mockResolvedValue(mockGetGoods)

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => (
    {
      push: () => {}
    }
  ))
}))

const SuspenseHome = defineComponent({
  components: { HomeVue },
  template: `<Suspense><HomeVue/></Suspense>`
})

describe('Test Home component', () => {
  const wrapper = mount(SuspenseHome)

  test('Test list rendering', async () => {
    await flushPromises()
  
    expect(wrapper.findAll('[data-test="good"]')).toHaveLength(6)
  })

  test('Test BackToTop affix scroll behavior', async () => {
    const affix = wrapper.find('[data-test="affix"]')

    expect(affix.exists()).toBe(true)

    await affix.trigger('click')

    expect(wrapper.find('[data-test="main"]').element.scrollTop).toBe(0)
  })

  test('Test click to navagate', async () => {
    const btn = wrapper.findAll('[data-test="good"]')

    await btn[0].trigger('click')

    expect(useRouter).toHaveBeenCalledTimes(1)
  })

})