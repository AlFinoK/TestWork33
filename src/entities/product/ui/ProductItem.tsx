import Image from 'next/image'
import React from 'react'

import { Product } from '@/shared/lib'

import s from './ProductItem.module.scss'
import { CartButton } from '@/entities/cart'
import { useAuthStore } from '@/entities/auth'
import { Link } from '@/shared/config'

interface Props {
  product: Product
}
export const ProductItem: React.FC<Props> = ({ product }) => {
  const { isAuthenticated } = useAuthStore()

  return (
    <article className={s.card}>
      <div className={s.inner}>
        <Link href={`/products/${product.id}`}>
          <Image
            className={s.img}
            src={product.thumbnail}
            alt={product.title}
            width={100}
            height={100}
          />
          <h4 className={s.title}>{product.title}</h4>
          <p className={s.category}>{product.category}</p>
          <b className={s.price}>${product.price}</b>
        </Link>

        {isAuthenticated && <CartButton product={product} />}
      </div>
    </article>
  )
}
