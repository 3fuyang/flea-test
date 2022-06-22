import ReportVue from "../report/Report.vue"
import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import axios from 'axios'
import { defineComponent } from "vue"
import { mockGetReports } from "@/mocks/reports"

const suspenseOrder = defineComponent({
  components: { ReportVue },
  template: `<Suspense><ReportVue/></Suspense>`
})

vi.spyOn(axios, 'get').mockResolvedValue(mockGetReports)

vi.spyOn(axios, 'post').mockResolvedValue(true)

const wrapper = mount(suspenseOrder)

await flushPromises()

test('Testing import', async () => {
  expect(wrapper).toBeTruthy()
})

test('Testing list rendering', async () => {
  const reports = wrapper.findAll('[data-test="report"]')

  expect(reports).toHaveLength(4)
})

test('Testing sellerID rendering', async () => {
  const sellerIDs = wrapper.findAll('[data-test="sellerID"]')

  expect(sellerIDs[0].text()).toBe('1951002')
  expect(sellerIDs[1].text()).toBe('1951003')
  expect(sellerIDs[2].text()).toBe('2005151')
})

test('Testing buyerID rendering', async () => {
  const buyerIDs = wrapper.findAll('[data-test="buyerID"]')

  expect(buyerIDs[0].text()).toContain('1951001')
  expect(buyerIDs[1].text()).toContain('1951004')
  expect(buyerIDs[2].text()).toContain('1821504')
})

test('Testing status rendering', async () => {
  const stat = wrapper.findAll('[data-test="status"]')

  expect(stat[0].text()).toContain('待处理')
  expect(stat[1].text()).toContain('已封禁')
  expect(stat[2].text()).toContain('已驳回')
})

test('Testing ban button behavior', async () => {
  const stats = wrapper.findAll('[data-test="status"]')
  const ban = wrapper.findAll('[data-test="ban"]')[0]
  const reject = wrapper.findAll('[data-test="reject"]')[3]

  expect(ban.text()).toBe('封禁')
  expect(reject.text()).toBe('驳回')
  expect(stats[0].text()).toBe('待处理')

  await ban.trigger('click')

  expect(stats[0].text()).toBe('已封禁')

  await reject.trigger('click')

  expect(stats[3].text()).toBe('已驳回')
})