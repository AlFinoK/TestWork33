import Image from 'next/image'

import s from './UserBox.module.scss'
import { User } from '@/shared/lib'

export const UserBox = ({ data }: { data: User }) => {
  return (
    <div className={s.user}>
      <div className={s.userInfo}>
        <p className={s.firstName}>{data.firstName}</p>
        <p className={s.lastName}>{data.lastName}</p>
      </div>
      <Image
        style={{ borderRadius: '10px', objectFit: 'cover' }}
        src={data?.image}
        alt={'аватар'}
        width={40}
        height={40}
      />
    </div>
  )
}
