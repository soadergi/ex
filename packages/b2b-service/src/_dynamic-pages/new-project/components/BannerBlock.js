import React from 'react'

import { BANNERS } from 'config/banners'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import BigBanner from 'weplay-media/components/BigBanner'

import B2BSection from 'components/B2BSection/B2BSection'

import { useBanner } from 'hooks/useBanner'

const BannerBlock = ({ discipline }) => {
  const { locale } = useLocale()

  const bannerId = BANNERS[discipline.id]?.[locale]
  const banner = useBanner(bannerId)

  return banner && (
    <B2BSection>
      <BigBanner banner={banner} />
    </B2BSection>
  )
}

export default BannerBlock
