import { useTranslations } from 'next-intl'

import { mapServerError } from '../helpers'

export const useError = (error: any, formErrors: any) => {
  const t = useTranslations()

  const ErrorMessage = formErrors.phone?.message || null
  const errorMessageKey = error ? mapServerError(error) : null
  const genericErrorMessage = !errorMessageKey && error ? 'error' : null

  const translatedError = ErrorMessage
    ? ErrorMessage
    : errorMessageKey
      ? t(`errors.${errorMessageKey}`)
      : genericErrorMessage

  return {
    ErrorMessage,
    errorMessageKey,
    genericErrorMessage,
    translatedError,
  }
}
