'use client'

import React from 'react'

import { ListLoader, Pagination } from '@/shared/ui-kit'
import { useProductsPagination } from '@/features/productsPagination/useProductsPagination'

import s from './ProductList.module.scss'
import { ProductItem } from './ProductItem'

export const ProductList = () => {
  const { products, page, totalPages, loading, error, nextPage, prevPage } = useProductsPagination()

  if (loading) return <ListLoader />
  if (error) return <p className={s.status}>Error: {error}</p>

  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.content}>
          <h2 className={s.heading}>Products</h2>

          <div className={s.list}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPrev={prevPage} onNext={nextPage} />
        </div>
      </div>
    </section>
  )
}
