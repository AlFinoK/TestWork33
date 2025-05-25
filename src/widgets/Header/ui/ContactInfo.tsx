import { Link } from '@/shared/config'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import s from './ContactInfo.module.scss'

export const ContactInfo = ({ className }: { className?: string }) => {
  const t = useTranslations('header')
  const iconProps = { color: '#D10125', width: 16, height: 16 }

  return (
    <div className={clsx(s.info, className)}>
      <Link href="tel:+79999999999" className={clsx(s.infoItem, s.phone, s.hoverable)}>
        <PhoneIcon {...iconProps} />
        <span>{t('phone')}</span>
      </Link>
      <Link href="mailto:test@gmail.com" className={clsx(s.infoItem, s.email, s.hoverable)}>
        <EnvelopeIcon {...iconProps} />
        {t('email')}
      </Link>
      <span className={clsx(s.infoItem, s.address)}>
        <MapPinIcon {...iconProps} />
        {t('address')}
      </span>
    </div>
  )
}
