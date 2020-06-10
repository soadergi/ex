import { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import headerMenu from './config'

function useLocalizedHeaderMenuItems() {
  const t = useTranslation()

  const localizedHeaderMenuItems = useMemo(() => headerMenu.map(menuItem => ({
    ...menuItem,
    localizations: {
      url: menuItem.url,
      text: t(menuItem.text),
    },
  })), [t])

  return localizedHeaderMenuItems
}

export default useLocalizedHeaderMenuItems
