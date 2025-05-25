import React from 'react'

import s from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  message?: string | null
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null

  return <p className={s.errorMessage}>{message}</p>
}
