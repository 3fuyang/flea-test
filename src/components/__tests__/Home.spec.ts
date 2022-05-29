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

})