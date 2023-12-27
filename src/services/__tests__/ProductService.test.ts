import { beforeEach, describe, test, expect, vi } from 'vitest'
import ProductService from '../Product.service'
import { Product } from '../../types/models/Product'

const mockData = [
  {
    itemCode: 'A123',
    productName: 'Apple granny smith',
    productPackage: '40 LB',
    availableUnits: 3638066,
    category: 'Fruits',
    lastUpdated: '2023-12-15T08:12:17.000Z'
  },
  {
    itemCode: 'C789',
    productName: 'Banana green',
    productPackage: '8 CT',
    availableUnits: 8664948,
    category: 'Fruits',
    lastUpdated: '2023-12-18T10:52:03.000Z'
  }
]

describe('ProductService', () => {
  let productService: any

  beforeEach(() => {
    productService = new ProductService()
  })

  test('getProducts should return an array of Product instances', async () => {
    const spy = vi.spyOn(productService, 'getProducts')
    spy.mockResolvedValue(mockData)
    const products: Product[] = await productService.getProducts()
    expect(products).toBeInstanceOf(Array)
    expect(products).toHaveLength(2)
  })

  test('updateProduct should update product values', () => {
    const updateProduct = vi.spyOn(productService, 'updateProduct')
    const initialValue = 3638066
    const updatedValue = 5000000
    const product = new Product(
      'A123',
      'Apple granny smith',
      '40 LB',
      initialValue,
      'Fruits',
      '2023-12-15T08:12:17.000Z'
    )
    productService.updateProduct(product, updatedValue)
    expect(updateProduct).toHaveBeenCalled()
    expect(product.availableUnits).toBe(updatedValue)
    expect(product.lastUpdated).not.toBe('2023-12-15T08:12:17.000Z')
  })

  test('updateProduct should not update product values', () => {
    const updateProduct = vi.spyOn(productService, 'updateProduct')
    const initialValue = 3638066
    const updatedValue = 3638066
    const product = new Product(
      'A123',
      'Apple granny smith',
      '40 LB',
      initialValue,
      'Fruits',
      '2023-12-15T08:12:17.000Z'
    )
    productService.updateProduct(product, updatedValue)
    expect(updateProduct).toHaveBeenCalled()
    expect(product.availableUnits).toBe(initialValue)
    expect(product.lastUpdated).toBe('2023-12-15T08:12:17.000Z')
  })

  test('updateAvailableUnits should update availableUnits property', () => {
    const product = new Product(
      'A123',
      'Apple granny smith',
      '40 LB',
      3638066,
      'Fruits',
      '2023-12-15T08:12:17.000Z'
    )
    const updatedValue = 5000000
    productService.updateAvailableUnits(product, updatedValue)
    expect(product.availableUnits).toBe(updatedValue)
  })

  test('updateLastUpdatedProperty should update lastUpdated property', () => {
    const product = new Product(
      'A123',
      'Apple granny smith',
      '40 LB',
      3638066,
      'Fruits',
      '2023-12-15T08:12:17.000Z'
    )
    productService.updateLastUpdatedProperty(product)
    const now = new Date()
    expect(product.lastUpdated).toBe(now.toISOString())
  })

  test('should search for a product by itemCode, productName or category', () => {
    let filteredTable: []
    const tableData = {
      value: [
        {
          itemCode: 'A123',
          productName: 'Apple',
          category: 'Red'
        },
        {
          itemCode: 'B234',
          productName: 'Banana',
          category: 'Yellow'
        },
        {
          itemCode: 'C789',
          productName: 'Mango',
          category: 'Yummy'
        }
      ]
    }
    filteredTable = productService.searchProducts('Y', tableData)
    expect(filteredTable).toHaveLength(2)
    filteredTable = productService.searchProducts('r', tableData)
    expect(filteredTable).toHaveLength(1)
    filteredTable = productService.searchProducts('C', tableData)
    expect(filteredTable).toHaveLength(1)
    filteredTable = productService.searchProducts('23', tableData)
    expect(filteredTable).toHaveLength(2)
  })
})
