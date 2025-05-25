'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button, Loader } from '@/shared/ui-kit'
import { useProductStore } from '@/entities/product'

import s from './ProductDetailed.module.scss'

export const ProductDetailed = () => {
  const t = useTranslations('productDetailed')
  const params = useParams()
  const router = useRouter()
  const id = Number(params?.id)

  const { productDetail, detailLoading, detailError, fetchProductDetail } = useProductStore()

  useEffect(() => {
    if (!isNaN(id)) {
      fetchProductDetail(id)
    }
  }, [id, fetchProductDetail])

  if (detailLoading) return <Loader />
  if (detailError)
    return (
      <p className={s.message}>
        {t('error')}: {detailError}
      </p>
    )
  if (!productDetail) return <p className={s.message}>{t('notFound')}</p>

  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.content}>
          <div className={s.imageWrapper}>
            <Image
              src={productDetail.thumbnail}
              alt={productDetail.title}
              width={500}
              height={500}
              className={s.image}
              priority
            />
          </div>

          <div className={s.right}>
            <div className={s.details}>
              <h1 className={s.title}>{productDetail.title}</h1>
              <p className={s.category}>
                {t('category')}: <strong>{productDetail.category}</strong>
              </p>
              <p className={s.price}>
                {t('price')}: <strong>${productDetail.price}</strong>
              </p>
              <p className={s.description}>{productDetail.description}</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className={s.backButton}
              onClick={() => router.push('/products')}
            >
              {t('back')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
