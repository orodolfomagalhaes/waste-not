import { beforeEach, describe, expect, test } from 'vitest'
import SortService from '../Sort.service'

describe('SortService', () => {
  const sortState = {
    lastSortedColum: '',
    sortBy: ''
  }
  let sortService: any
  let mockData: any

  beforeEach(() => {
    sortService = new SortService(sortState, mockData)
    mockData = [
      {
        itemCode: 'D987',
        productName: 'Banana green tip',
        productPackage: '40 LB',
        availableUnits: 100,
        category: 'Fruits',
        lastUpdated: '2023-12-17T18:47:29.000Z'
      },
      {
        itemCode: 'E123',
        productName: 'Green Apple',
        productPackage: '20 LB',
        availableUnits: 200,
        category: 'Fruits',
        lastUpdated: '2023-12-02T16:59:36.000Z'
      }
    ]
  })

  test('should sort column', () => {
    sortService.data = { value: mockData }
    sortService.sortColumn('productName')
    expect(sortService.data.value[0].productName).toBe('Banana green tip')
    expect(sortService.sortState.sortBy).toBe('ASC')
    sortService.sortColumn('productName')
    expect(sortService.data.value[0].productName).toBe('Green Apple')
    expect(sortService.sortState.sortBy).toBe('DESC')
  })

  test('ascendingSortMethods should correctly sort strings in ascending order', () => {
    let sortedData = mockData.sort(sortService.ascendingSortMethods.productName)
    expect(sortedData[0].productName).toBe('Banana green tip')
    sortedData = mockData.sort(sortService.ascendingSortMethods.productPackage)
    expect(sortedData[0].productPackage).toBe('20 LB')
    sortedData = mockData.sort(sortService.ascendingSortMethods.availableUnits)
    expect(sortedData[0].availableUnits).toBe(100)
    sortedData = mockData.sort(sortService.ascendingSortMethods.lastUpdated)
    expect(sortedData[0].lastUpdated).toBe('2023-12-02T16:59:36.000Z')
  })

  test('descendingSortMethods should correctly sort strings in descending order', () => {
    let sortedData = mockData.sort(sortService.descendingSortMethods.productName)
    expect(sortedData[0].productName).toBe('Green Apple')
    sortedData = mockData.sort(sortService.descendingSortMethods.productPackage)
    expect(sortedData[0].productPackage).toBe('40 LB')
    sortedData = mockData.sort(sortService.descendingSortMethods.availableUnits)
    expect(sortedData[0].availableUnits).toBe(200)
    sortedData = mockData.sort(sortService.descendingSortMethods.lastUpdated)
    expect(sortedData[0].lastUpdated).toBe('2023-12-17T18:47:29.000Z')
  })

  test('resetSortState should reset sortState properties', () => {
    sortService.sortState.lastSortedColum = 'productName'
    sortService.sortState.sortBy = 'ASC'
    sortService.resetSortState('productPackage')
    expect(sortService.sortState.lastSortedColum).toBe('productPackage')
    expect(sortService.sortState.sortBy).toBe('')
  })
})
