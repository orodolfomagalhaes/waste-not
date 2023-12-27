import type { Ref, UnwrapNestedRefs } from 'vue'
import type { Product } from '@/types/models/Product'

export default class SortService {
  constructor(
    readonly sortState: UnwrapNestedRefs<{ lastSortedColum: string; sortBy: string }>,
    readonly data: Ref<Product[]>
  ) {}

  ascendingSortMethods: any = {
    productName: this.sortByAscendingString('productName'),
    productPackage: this.sortByAscendingString('productPackage'),
    availableUnits: this.sortByAscendingInteger('availableUnits'),
    lastUpdated: this.sortByAscendingDates('lastUpdated')
  }

  descendingSortMethods: any = {
    productName: this.sortByDescendingString('productName'),
    productPackage: this.sortByDescendingString('productPackage'),
    availableUnits: this.sortByDescendingInteger('availableUnits'),
    lastUpdated: this.sortByDescendingDates('lastUpdated')
  }

  sortByAscendingString(property: string): Function {
    return function (a: any, b: any) {
      return a[property].localeCompare(b[property])
    }
  }

  sortByDescendingString(property: string): Function {
    return function (a: any, b: any) {
      return b[property].localeCompare(a[property])
    }
  }

  sortByAscendingInteger(property: string): Function {
    return function (a: any, b: any) {
      return a[property] - b[property]
    }
  }

  sortByDescendingInteger(property: string): Function {
    return function (a: any, b: any) {
      return b[property] - a[property]
    }
  }

  sortByAscendingDates(property: string): Function {
    return function (a: any, b: any) {
      const dateA: any = new Date(a[property])
      const dateB: any = new Date(b[property])
      return dateA - dateB
    }
  }

  sortByDescendingDates(property: string): Function {
    return function (a: any, b: any) {
      const dateA: any = new Date(a[property])
      const dateB: any = new Date(b[property])
      return dateB - dateA
    }
  }

  resetSortState(columnId: string): void {
    this.sortState.lastSortedColum = columnId
    this.sortState.sortBy = ''
  }

  sortColumn(columnId: string): void {
    if (!this.sortState.lastSortedColum || this.sortState.lastSortedColum !== columnId) {
      this.resetSortState(columnId)
    }
    if (!this.sortState.sortBy || this.sortState.sortBy === 'DESC') {
      this.sortState.sortBy = 'ASC'
      this.data.value.sort(this.ascendingSortMethods[columnId])
      return
    }
    if (this.sortState.sortBy === 'ASC') {
      this.sortState.sortBy = 'DESC'
      this.data.value.sort(this.descendingSortMethods[columnId])
    }
  }
}
