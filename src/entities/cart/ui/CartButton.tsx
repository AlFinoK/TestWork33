'use client'

import clsx from 'clsx'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'

import { Product } from '@/shared/lib'
import { Button } from '@/shared/ui-kit'

import s from './CartButton.module.scss'
import { useCartStore } from '../model'

interface CartButtonProps {
  product: Product
}

export const CartButton: React.FC<CartButtonProps> = ({ product }) => {
  const t = useTranslations('cart')
  const addItem = useCartStore((state) => state.addItem)
  const isInCart = useCartStore((state) => state.isInCart(product.id))

  const handleAddToCart = () => {
    if (isInCart) {
      toast(t('alreadyInCart'))
      return
    }

    addItem(product)
    toast.success(t('addedSuccess'))
  }

  return (
    <Button
      variant="primary"
      size="lg"
      className={clsx(s.cartBtn, { [s.inCart]: isInCart })}
      onClick={handleAddToCart}
      aria-label={isInCart ? t('inCart') : t('addToCart')}
      type="button"
    >
      <ShoppingCartIcon className={s.icon} />
      {isInCart ? ` ${t('inCart')}` : ` ${t('addToCart')}`}
    </Button>
  )
}
