'use client'

import clsx from 'clsx'
import React from 'react'
import { toast } from 'react-hot-toast'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'

import { Product } from '@/shared/lib'
import { Button } from '@/shared/ui-kit'

import s from './CartButton.module.scss'
import { useCartStore } from '../model'

interface CartButtonProps {
  product: Product
}

export const CartButton: React.FC<CartButtonProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)
  const isInCart = useCartStore((state) => state.isInCart(product.id))

  const handleAddToCart = () => {
    if (isInCart) {
      toast('Товар уже в корзине')
      return
    }

    addItem(product)
    toast.success('Успешно добавлено в корзину')
  }

  return (
    <Button
      variant="primary"
      size="lg"
      className={clsx(s.cartBtn, { [s.inCart]: isInCart })}
      onClick={handleAddToCart}
      aria-label={isInCart ? 'Товар в корзине' : 'Добавить в корзину'}
      type="button"
    >
      <ShoppingCartIcon className={s.icon} />
      {isInCart ? ' В корзине' : ' В корзину'}
    </Button>
  )
}
