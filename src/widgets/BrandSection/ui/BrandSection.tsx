'use client'

import s from './BrandSection.module.scss'
import Image from 'next/image'

export const BrandSection = () => {
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.inner}>
          <div className={s.content}>
            <h1 className={s.title}>
              Any Shop<span className={s.dot}>.</span>
            </h1>
            <Image
              priority
              src={'https://picsum.photos/600/100'}
              alt="brand"
              width={600}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
