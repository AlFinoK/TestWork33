'use client'

import { useEffect } from 'react'

import { useProductStore } from '@/entities/product'

export const useProductsPagination = () => {
  const { products, page, total, limit, loading, error, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts(page)
  }, [page])

  const totalPages = Math.ceil(total / limit)

  const nextPage = () => {
    if (page < totalPages) {
      useProductStore.setState({ page: page + 1 })
    }
  }

  const prevPage = () => {
    if (page > 1) {
      useProductStore.setState({ page: page - 1 })
    }
  }

  return { products, page, totalPages, loading, error, nextPage, prevPage }
}
