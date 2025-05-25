import { useTranslations } from 'next-intl'

import { mapServerError } from '../helpers'

export const useError = (error: any) => {
  const t = useTranslations()
  const errorMessageKey = error ? mapServerError(error) : null
  const genericErrorMessage = !errorMessageKey && error ? 'error' : null

  const translatedError = errorMessageKey ? t(`errors.${errorMessageKey}`) : genericErrorMessage

  return {
    translatedError,
  }
}
