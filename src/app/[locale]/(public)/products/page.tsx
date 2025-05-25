import { useTranslations } from 'next-intl'

import { ProductList } from '@/entities/product'

import s from './page.module.scss'

export default function Home() {
  const t = useTranslations()

  return (
    <div className={s.page}>
      <ProductList />
    </div>
  )
}
