'use client'

import { SyncLoader } from 'react-spinners'

export function ListLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <SyncLoader color={'#D10125'} />
    </div>
  )
}
