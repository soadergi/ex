import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import { bannerByIdDataSelector } from 'weplay-media/reduxs/banners/reducer'
import { getBannerById } from 'weplay-media/reduxs/banners/actions'

export const useBanner = (bannerId) => {
  const banner = useSelector(bannerByIdDataSelector)
  const { getBannerByIdRequest } = useAction({ getBannerByIdRequest: getBannerById.request })
  useEffect(() => {
    if (bannerId && bannerId !== banner?.id) {
      getBannerByIdRequest(bannerId)
    }
  }, [banner, bannerId, getBannerByIdRequest])
  return bannerId === banner?.id ? banner : null
}
