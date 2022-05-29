import HomeVue from "../home/Home.vue"
import { test, expect, describe, vi } from 'vitest'
import { flushPromises, mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import axios from 'axios'
import { mockGetGoods } from '@/mocks/goods'

vi.spyOn(axios, 'get').mockResolvedValue(mockGetGoods)

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
  
  test('Test BackToTop affix exists', async () => {
    const affix = wrapper.find('[data-test="affix"]')

    expect(affix.exists()).toBe(true)
  })

  test('Test BackToTop affix scroll behavior', async () => {
    const main = wrapper.find('[data-test="main"]')
    const affix = wrapper.find('[data-test="affix"]')

    expect(main.exists()).toBe(true)

    console.log(main.element.toString())

    main.element.scrollTop = main.element.scrollHeight

    expect(main.element.scrollTop).not.toBe(0)

    await affix.trigger('click')

    expect(main.element.scrollTop).toBe(0)
  })

})