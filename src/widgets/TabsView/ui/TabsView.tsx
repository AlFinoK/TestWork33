'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

import s from './TabsView.module.scss'

const tabs = [
  { key: 'home', route: 'products' },
  { key: 'hotDeals', route: 'hot_deals' },
  { key: 'categories', route: 'categories' },
  { key: 'laptops', route: 'laptops' },
  { key: 'smartphones', route: 'smartphones' },
  { key: 'cameras', route: 'cameras' },
  { key: 'accessories', route: 'accessories' },
]

const defaultTab = 'home'

export const TabsView = () => {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('tabs')

  const activeTab = pathname.split('/').pop() || defaultTab

  return (
    <div className={s.tabList}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.route

        return (
          <div
            key={tab.route}
            className={clsx(s.tab, {
              [s.active]: isActive,
            })}
            onClick={() => router.push(`/${tab.route}`)}
          >
            <div className={s.left}>{t(tab.key)}</div>
          </div>
        )
      })}
    </div>
  )
}
