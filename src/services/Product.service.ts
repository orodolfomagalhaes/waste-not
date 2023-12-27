import { Product } from '@/types/models/Product'

export default class ProductService {
  constructor() {}

  async getProducts(): Promise<Product[]> {
    const dataFromService = [
      {
        itemCode: 'A123',
        productName: 'Apple granny smith',
        productPackage: '40 LB',
        availableUnits: 3638066,
        category: 'Apples',
        lastUpdated: '2023-12-15T08:12:17.000Z'
      },
      {
        itemCode: 'B456',
        productName: 'Pineapple crownless',
        productPackage: '7 CT',
        availableUnits: 6462020,
        category: 'Pineapples',
        lastUpdated: '2023-12-17T15:33:58.000Z'
      },
      {
        itemCode: 'C789',
        productName: 'Banana green',
        productPackage: '8 CT',
        availableUnits: 8664948,
        category: 'Bananas',
        lastUpdated: '2023-12-18T10:52:03.000Z'
      },
      {
        itemCode: 'D987',
        productName: 'Banana green tip',
        productPackage: '40 LB',
        availableUnits: 2592335,
        category: 'Bananas',
        lastUpdated: '2023-12-17T18:47:29.000Z'
      },
      {
        itemCode: 'E123',
        productName: 'Green Apple',
        productPackage: '20 LB',
        availableUnits: 1985642,
        category: 'Apples',
        lastUpdated: '2023-12-20T16:59:36.000Z'
      },
      {
        itemCode: 'F456',
        productName: 'Mango Tommy Atkins',
        productPackage: '5 CT',
        availableUnits: 1859642,
        category: 'Mangos',
        lastUpdated: '2023-12-22T19:52:13.000Z'
      },
      {
        itemCode: 'G789',
        productName: 'Mango Kent',
        productPackage: '8 CT',
        availableUnits: 453217,
        category: 'Mangos',
        lastUpdated: '2023-12-23T13:59:04.000Z'
      },
      {
        itemCode: 'H123',
        productName: 'Papaya',
        productPackage: '2 CT',
        availableUnits: 1958475,
        category: 'Papaya',
        lastUpdated: '2023-12-21T10:55:34.000Z'
      },
      {
        itemCode: 'I456',
        productName: 'Raspberry Seedless',
        productPackage: '10 LB',
        availableUnits: 938571,
        category: 'Berry fruits',
        lastUpdated: '2023-12-19T08:17:30.000Z'
      },
      {
        itemCode: 'J789',
        productName: 'Blackberry Organic',
        productPackage: '2 LB',
        availableUnits: 748159,
        category: 'Berry fruits',
        lastUpdated: '2023-12-22T09:57:13.000Z'
      }
    ]
    const products = dataFromService.map(
      (data) =>
        new Product(
          data.itemCode,
          data.productName,
          data.productPackage,
          data.availableUnits,
          data.category,
          data.lastUpdated
        )
    )
    return products
  }

  searchProducts(value: any, tableData: any): Product[] {
    const lowerCaseValue = value.toLowerCase()
    const data = tableData.value.filter((item: Product) => {
      const itemCode = item.itemCode.toLowerCase().includes(lowerCaseValue)
      const productName = item.productName.toLowerCase().includes(lowerCaseValue)
      const category = item.category.toLowerCase().includes(lowerCaseValue)
      return itemCode || productName || category
    })
    return data
  }

  updateProduct(product: Product, value: number): void {
    if (value === product.availableUnits) return
    this.updateAvailableUnits(product, value)
    this.updateLastUpdatedProperty(product)
  }

  updateAvailableUnits(product: Product, value: number): void {
    product.updateAvailableUnits(value)
  }

  updateLastUpdatedProperty(product: Product): void {
    const now = new Date()
    product.updateLastUpdated(now.toISOString())
  }
}
