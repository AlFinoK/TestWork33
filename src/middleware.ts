import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './shared/config/i18n'

const nextIntlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = nextIntlMiddleware(request)

  const hasCookie = request.cookies.get('browserLang')
  if (!hasCookie) {
    const acceptLang = request.headers.get('accept-language')
    const lang = acceptLang?.split(',')[0].split('-')[0] ?? 'ru'
    const normalized = ['en', 'ru'].includes(lang) ? lang : 'ru'

    response.cookies.set('browserLang', normalized, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
  }

  return response
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
