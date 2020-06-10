import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { pathWithParamsByRoute } from 'weplay-core/routes'
import { originSelector } from 'weplay-core/reduxs/common/selectors'

import PageHelmet from 'weplay-components/PageHelmet'
import HrefLangLink from 'weplay-components/HrefLangLink'
import IsomorphicHead from 'weplay-components/IsomorphicHead'

const SectionSeoHead = ({
  pageName,
  section,
  ogImage,
}) => {
  const origin = useSelector(originSelector)
  const { locale } = useLocale()

  const canonicalUrl = useMemo(() => {
    const langPref = locale === 'en' ? '' : `/${locale}`
    return `${origin}${langPref}${pathWithParamsByRoute(pageName)}`
  }, [locale, origin, pageName])

  return (
    <>
      <PageHelmet
        lokaliseProject="mediaCore"
        ogImage={ogImage}
      />

      <IsomorphicHead>
        <link
          rel="canonical"
          href={canonicalUrl}
        />
      </IsomorphicHead>
      <HrefLangLink pathname={pathWithParamsByRoute(pageName, { section })} />
    </>
  )
}

SectionSeoHead.propTypes = {
  pageName: PropTypes.string.isRequired,
  section: PropTypes.string,
  ogImage: PropTypes.string.isRequired,
}

SectionSeoHead.defaultProps = {
  section: '',
}

export default React.memo(SectionSeoHead)
