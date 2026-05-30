import { apiClient } from './axiosInstance.js'
import { applyProductDelete, applyProductUpdate } from '../products/clientProductCrud.js'

const normalizeProductsResponse = (data) => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.products)) return data.products
  if (Array.isArray(data?.results)) return data.results
  return []
}

export async function getProducts() {
  const { data } = await apiClient.get('/products/')
  return normalizeProductsResponse(data)
}

/**
 * TEMP / TODO: сейчас обновляет zustand локально.
 * После появления backend — PUT/PATCH /api/products/:id/ с тем же payload.
 */
export async function saveProduct(payload) {
  applyProductUpdate(payload)
  console.log('save', payload)
  return Promise.resolve(payload)
}

/**
 * TEMP / TODO: сейчас удаляет из zustand локально.
 * После появления backend — DELETE /api/products/:id/.
 */
export async function deleteProduct(id) {
  applyProductDelete(id)
  console.log('delete', id)
  return Promise.resolve()
}
