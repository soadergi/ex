import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'

import { getBanners } from 'weplay-media/reduxs/banners/actions'
import { bigBannersSelector } from 'weplay-media/reduxs/banners/reducer'

export const useBigBannerByTag = (tagConfigList) => {
  const { locale } = useLocale()
  const banners = useSelector(bigBannersSelector)

  const bigBanner = useMemo(() => {
    if (!tagConfigList) return null
    return banners.find(banner => tagConfigList.reduce((hasBanner, tagConfig) => (
      hasBanner || (banner[tagConfig.tagType] === tagConfig.tagTypeId && banner.language === tagConfig.language)
    ), false))
  }, [tagConfigList, banners])

  const { getBannersRequest } = useAction({
    getBannersRequest: getBanners.request,
  })

  useEffect(() => {
    getBannersRequest({
      language: locale,
    })
  }, [locale])

  return { bigBanner }
}
