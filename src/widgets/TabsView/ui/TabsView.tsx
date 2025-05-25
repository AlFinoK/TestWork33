'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import s from './TabsView.module.scss'
import clsx from 'clsx'

const tabs = [
  { name: 'Home', route: '/' },
  { name: 'Hot deals', route: 'hot_deals' },
  { name: 'Categories', route: 'categories' },
  { name: 'Laptops', route: 'laptops' },
  { name: 'Smartphones', route: 'smartphones' },
  { name: 'Cameras', route: 'cameras' },
  { name: 'Accessories', route: 'accessories' },
]

const defaultTab = 'Home'

export const TabsView = () => {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations()
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
            <div className={s.left}>{tab.name}</div>
          </div>
        )
      })}
    </div>
  )
}
