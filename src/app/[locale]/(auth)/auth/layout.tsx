import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'

import '@/app/styles/index.scss'
import { Header, Footer, TabsView } from '@/widgets'
import { validateLocale } from '@/shared/config'
import { AppToaster } from '@/app/providers'
import { BrandSection } from '@/widgets/BrandSection'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['cyrillic'],
})

export const metadata: Metadata = {
  title: 'TestWork33',
  description: 'TestWork33',
}

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  validateLocale((await params).locale)

  return (
    <html lang={locale}>
      <body className={openSans.variable}>
        <NextIntlClientProvider>
          <AppToaster />
          <div className="wrapper">
            <div className="top">
              <Header />
              <BrandSection />
              <TabsView />
            </div>
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
