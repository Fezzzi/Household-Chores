import { DEFAULT_LOCALE, isAvailableLocale } from 'shared/constants'
import { STORAGE_KEY } from 'web/constants'

import { useSelector } from './useTypedRedux'

export const useCurrentLocale = () => {
  const currentLocale = useSelector(({ locale: { locale } }) => locale)
  if (currentLocale === null) {
    return getDefaultLocale()
  }

  return currentLocale
}

export const getDefaultLocale = () => {
  const storageLocale = localStorage.getItem(STORAGE_KEY.LOCALE)
  const browserLocales = navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages

  const defaultBrowserLocale = browserLocales?.find(isAvailableLocale)
  return (storageLocale && isAvailableLocale(storageLocale))
    ? storageLocale
    : (defaultBrowserLocale ?? DEFAULT_LOCALE)
}
