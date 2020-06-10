import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import SeoTags from 'components/SeoTags/SeoTags'

const CommonSeoTags = ({
  routeInfo,
}) => {
  const t = useTranslation()
  const title = routeInfo.lokaliseKey ? t(`${routeInfo.lokaliseKey}.seo.title`) : ''
  const description = routeInfo.lokaliseKey ? t(`${routeInfo.lokaliseKey}.seo.description`) : ''
  const img = {
    url: 'https://static-prod.weplay.tv/2019-06-26/cebbfde0939816829386b129c41dcfc4.jpeg',
    width: 615,
    height: 300,
  }
  return (
    <SeoTags
      title={title}
      description={description}
      img={img}
    />
  )
}

export default React.memo(withRouteInfo(CommonSeoTags))
