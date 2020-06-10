import React from 'react'
import PropTypes from 'prop-types'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import IsomorphicHead from 'weplay-components/IsomorphicHead'

import container from './container'
import { useBasicSeoParams } from './useBasicSeoParams'

const PageHelmet = ({

  // container props
  seoInfo,
  lokaliseProject,
  pageName,
  subPageName,
  seoParams,

  location,
  isNoindex,
  isCanonical,
  canonicalUrl,
  hasSeoScript,
  t,

  // optional props
  ogImage,
  width,
  height,
  seoScript,
}) => {
  const [
    title,
    description,
    keywords,
  ] = useBasicSeoParams({
    seoInfo,
    lokaliseProject,
    pageName,
    subPageName,
    seoParams,
    t,
  })
  return (
    <IsomorphicHead>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={ogImage.toString()} // support for responsive-loader
      />
      <meta
        property="og:url"
        content={location.pathname}
      />
      <meta
        property="og:image:width"
        content={width}
      />
      <meta
        property="og:image:height"
        content={height}
      />
      <meta
        property="og:site_name"
        content="https://weplay.tv"
      />
      <meta
        property="article:author"
        content="https://www.facebook.com/WePlayEsport/"
      />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/WePlayEsport/"
      />
      <meta
        name="keywords"
        content={keywords}
      />
      {isNoindex && (
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      )}
      {isCanonical && (
        <link
          rel="canonical"
          href={canonicalUrl}
        />
      )}
      {hasSeoScript && (
        <script type="application/ld+json">
          {seoScript}
        </script>
      )}
    </IsomorphicHead>
  )
}

PageHelmet.propTypes = {
  // container props
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isNoindex: PropTypes.bool.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
  isCanonical: PropTypes.bool.isRequired,
  hasSeoScript: PropTypes.bool.isRequired,
  seoScript: PropTypes.string.isRequired,
  seoInfo: PropTypes.shape({}),
  lokaliseProject: PropTypes.string,
  pageName: PropTypes.string.isRequired,
  subPageName: PropTypes.string.isRequired,
  seoParams: PropTypes.shape({}),
  t: PropTypes.func.isRequired,

  // optional props
  ogImage: imgPropType,
  width: PropTypes.number,
  height: PropTypes.number,
}

PageHelmet.defaultProps = {
  ogImage: 'https://static-prod.weplay.tv/2019-10-02/e40ffbd663d51248c3eb2a2681737e90.jpeg',
  width: 638,
  height: 335,
  lokaliseProject: '',
  seoParams: null,
  seoInfo: null,
}

export default container(PageHelmet)
