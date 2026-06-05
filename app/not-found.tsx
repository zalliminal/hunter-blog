// app/not-found.tsx
import NotFoundClient from '@/components/not-found-client'
import { DEFAULT_LOCALE, getDirection } from '@/lib/i18n'

export default function RootNotFound() {
  const dir = getDirection(DEFAULT_LOCALE)
  return (
    <div dir={dir} data-locale={DEFAULT_LOCALE} className="min-h-screen">
      <NotFoundClient locale={DEFAULT_LOCALE} />
    </div>
  )
}