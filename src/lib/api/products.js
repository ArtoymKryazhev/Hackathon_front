import { apiClient } from './axiosInstance.js'

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
