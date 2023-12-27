<script setup lang="ts">
// Vue
import { computed, onMounted, reactive, type Ref, ref, type UnwrapNestedRefs } from 'vue'
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSort, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
library.add(faSort, faMagnifyingGlass)
// Components
import FormattedInput from '@/components/input/FormattedInput.vue'
// Services
import ProductService from '@/services/Product.service'
import SortService from '@/services/Sort.service'
import { Locales } from '@/enum/Locales.enum'
import type { Product } from '@/types/models/Product'

const tableData: Ref<Product[]> = ref([])
const filteredData: Ref<Product[]> = ref([])
const showNoProductsFound = computed(() => filteredData.value.length === 0)

const productService: ProductService = new ProductService()
const formattedAvailableUnits: Function = (availableUnits: number): string =>
  availableUnits.toLocaleString(Locales.EN_US)
const formattedLastUpdated: Function = (lastUpdated: string): string =>
  lastUpdated.substring(0, 19).replace('T', ' ')
const initializeTableData: Function = (data: Product[]): void => {
  tableData.value = data
  filteredData.value = data
}
const search: any = (event: any): void => {
  const value = event.target.value
  filteredData.value = productService.searchProducts(value, tableData)
}

const sortState: UnwrapNestedRefs<{ lastSortedColum: string; sortBy: string }> = reactive({
  lastSortedColum: '',
  sortBy: ''
})
const sortService: SortService = new SortService(sortState, filteredData)

onMounted(async () => {
  const data: Product[] = await productService.getProducts()
  initializeTableData(data)
})
</script>

<template>
  <div class="container-fluid p-3">
    <header>
      <h1>Inventory</h1>
    </header>
    <section>
      <div class="row mx-0">
        <form>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="product-search"
              name="product-search"
              placeholder="Product search"
              aria-label="Product search field"
              @keyup="search"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="search-icon">
                <font-awesome-icon
                  icon="fa-solid fa-magnifying-glass"
                  aria-label="Search products icon"
                />
              </span>
            </div>
          </div>
        </form>
      </div>
      <div class="row mx-0">
        <table class="table mb-0">
          <caption>
            List of products
          </caption>
          <thead>
            <tr>
              <th scope="col">Item code</th>
              <th scope="col">
                Product
                <font-awesome-icon
                  icon="sort"
                  type="button"
                  aria-label="Order product column"
                  @click="sortService.sortColumn('productName')"
                />
              </th>
              <th scope="col">
                Package
                <font-awesome-icon
                  icon="sort"
                  type="button"
                  aria-label="Order product column"
                  @click="sortService.sortColumn('productPackage')"
                />
              </th>
              <th scope="col">
                Available units
                <font-awesome-icon
                  icon="sort"
                  type="button"
                  aria-label="Order available units column"
                  @click="sortService.sortColumn('availableUnits')"
                />
              </th>
              <th scope="col">Category</th>
              <th scope="col">
                Last updated
                <font-awesome-icon
                  icon="sort"
                  type="button"
                  aria-label="Order last updated column"
                  @click="sortService.sortColumn('lastUpdated')"
                />
              </th>
              <th scope="col">Edit available quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredData" :key="product.itemCode">
              <td>{{ product['itemCode'] }}</td>
              <td>{{ product['productName'] }}</td>
              <td>{{ product['productPackage'] }}</td>
              <td>{{ formattedAvailableUnits(product['availableUnits']) }}</td>
              <td>{{ product['category'] }}</td>
              <td>{{ formattedLastUpdated(product['lastUpdated']) }}</td>
              <td>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Qty</span>
                  </div>
                  <FormattedInput
                    class="form-control"
                    :id="product.itemCode"
                    :name="product.itemCode"
                    placeholder="Available quantity"
                    aria-label="Edit quantity of available units"
                    :inputValue="product.availableUnits"
                    @updated="productService.updateProduct(product, $event)"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="showNoProductsFound">
              <td colspan="7" class="text-center text-muted">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
table.table {
  thead {
    th {
      background-color: #f9f9f9;
      border-top: 0;
      border-bottom: 0;
      position: relative;
      svg {
        color: #b3b3b3;
        margin-left: 5px;
      }
    }
    th:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      width: 1px;
      height: 20px;
      background-color: #dee2e6;
    }
  }
  tbody {
    tr {
      td:nth-child(2) {
        color: #38683c;
      }
    }
  }
}
</style>
