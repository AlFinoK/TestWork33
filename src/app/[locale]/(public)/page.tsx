import { useTranslations } from 'next-intl'

import s from './page.module.scss'
import { ProductList } from '@/entities/product'

export default function Home() {
  const t = useTranslations()

  return (
    <div className={s.page}>
      <ProductList />
    </div>
  )
}
