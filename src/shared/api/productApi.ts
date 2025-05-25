import { API_URL, httpClient, Product, ProductsResponse } from '../lib'

export const productApi = {
  getProducts: (page: number, limit: number): Promise<ProductsResponse> => {
    return httpClient(`${API_URL}/products?limit=${limit}&skip=${(page - 1) * limit}`, {
      method: 'GET',
    })
  },

  getProduct: (productId: number): Promise<Product> =>
    httpClient(`${API_URL}/products/${productId}`, {
      method: 'GET',
    }),
}
