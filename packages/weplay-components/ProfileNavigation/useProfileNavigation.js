import { useCallback, useMemo } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { getPrefix } from 'weplay-core/routes/_helpers'

import { popupItems } from './config'

const useProfileNavigation = ({ isDetailed }) => {
  const { locale } = useLocale()

  const getNavigationItem = useCallback(item => ({
    title: item.localizations[locale].title,
    url: `${getPrefix(locale)}${item.url}`,
    iconName: item?.iconName,
    isPremium: item?.isPremium,
    lastInCategory: item?.lastInCategory,
  }), [locale])

  const menuItems = useMemo(() => popupItems?.map(popupItem => ({
    ...getNavigationItem(popupItem),
    subItems: isDetailed ? popupItem.subItems?.map(subItem => getNavigationItem(subItem)) : null,
  })), [locale, popupItems])

  return {
    menuItems,
  }
}

export default useProfileNavigation
