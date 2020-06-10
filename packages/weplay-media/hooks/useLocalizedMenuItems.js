import { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

export const useLocalizedMenuItems = (items) => {
  const t = useTranslation()

  return useMemo(() => items.map(item => ({
    ...item,
    text: t(item.textKey),
    ...item.label && {
      label: {
        text: t(item.label.textKey),
        color: item.label.color,
      },
    },
  })), [items, t])
}
