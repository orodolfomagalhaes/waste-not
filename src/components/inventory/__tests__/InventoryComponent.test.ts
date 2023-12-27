import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import InventoryComponent from '../InventoryComponent.vue'
import { Columns } from '../../../enum/Columns.enum'

describe('Inventory Component', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = mount(InventoryComponent)
  })

  test('renders header with text "Inventory"', () => {
    const header = wrapper.find('h1')
    expect(header.text()).toBe('Inventory')
  })

  test('renders input with placeholder "Product search"', () => {
    const input = wrapper.find('input#product-search')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Product search')
  })

  test('renders search icon', () => {
    const span = wrapper.find('span#search-icon')
    const svgIcon = span.find('svg')
    const faMagnifyingGlassClass = 'fa-magnifying-glass'
    expect(span.exists()).toBe(true)
    expect(svgIcon.exists()).toBe(true)
    expect(svgIcon.classes()).toContain(faMagnifyingGlassClass)
  })

  test('renders table with specified columns', () => {
    const table = wrapper.find('table')
    expect(table.text()).toContain(Columns.ITEM_CODE)
    expect(table.text()).toContain(Columns.PRODUCT)
    expect(table.text()).toContain(Columns.PACKAGE)
    expect(table.text()).toContain(Columns.AVAILABLE_UNITS)
    expect(table.text()).toContain(Columns.CATEGORY)
    expect(table.text()).toContain(Columns.LAST_UPDATED)
    expect(table.text()).toContain(Columns.EDIT_AVAILABLE_QUANTITY)
  })

  test('renders table head "Product" with sort icon', () => {
    const table = wrapper.find('table')
    const thList = table.findAll('th')
    const th = thList.find((th: any): boolean => th.text() === Columns.PRODUCT)
    const svgIcon = th.find('svg')
    const faSortClass = 'fa-sort'
    expect(th.exists()).toBe(true)
    expect(svgIcon.exists()).toBe(true)
    expect(svgIcon.classes()).toContain(faSortClass)
  })

  test('renders table head "Package" with sort icon', () => {
    const table = wrapper.find('table')
    const thList = table.findAll('th')
    const th = thList.find((th: any): boolean => th.text() === Columns.PACKAGE)
    const svgIcon = th.find('svg')
    const faSortClass = 'fa-sort'
    expect(th?.exists()).toBe(true)
    expect(svgIcon.exists()).toBe(true)
    expect(svgIcon.classes()).toContain(faSortClass)
  })

  test('renders table head "Available units" with sort icon', () => {
    const table = wrapper.find('table')
    const thList = table.findAll('th')
    const th = thList.find((th: any): boolean => th.text() === Columns.AVAILABLE_UNITS)
    const svgIcon = th.find('svg')
    const faSortClass = 'fa-sort'
    expect(th?.exists()).toBe(true)
    expect(svgIcon.exists()).toBe(true)
    expect(svgIcon.classes()).toContain(faSortClass)
  })

  test('renders table head "Last updated" with sort icon', () => {
    const table = wrapper.find('table')
    const thList = table.findAll('th')
    const th = thList.find((th: any): boolean => th.text() === Columns.LAST_UPDATED)
    const svgIcon = th.find('svg')
    const faSortClass = 'fa-sort'
    expect(th?.exists()).toBe(true)
    expect(svgIcon.exists()).toBe(true)
    expect(svgIcon.classes()).toContain(faSortClass)
  })

  test('should search for products', async () => {
    await wrapper.find('input#product-search').setValue('th')
    await wrapper.find('input#product-search').trigger('keyup')
    expect(wrapper.vm.filteredData).toHaveLength(1)
    await wrapper.find('input#product-search').setValue('y')
    await wrapper.find('input#product-search').trigger('keyup')
    expect(wrapper.vm.filteredData).toHaveLength(5)
  })
})
