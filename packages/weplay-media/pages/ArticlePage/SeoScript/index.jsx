import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import getArticleImage from 'weplay-core/helpers/getArticleImage'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import IsomorphicHead from 'weplay-components/IsomorphicHead'

const SeoScript = ({
  newspaper,
  locationHref,
}) => {
  const articleImage = useMemo(() => getArticleImage(newspaper), [newspaper])

  return (
    <IsomorphicHead>
      <script type="application/ld+json">
        {`
      {
        "@context": "http://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${locationHref}"
      },
        "headline": "${newspaper.title?.replace(/"/g, '&quot;')}",
        "description": "${newspaper.description?.replace(/"/g, '&quot;')}",
        "image": "${articleImage.url}",
        "datePublished": "${newspaper.publishedDate}",
        "dateModified": "${newspaper.updatedDate ? newspaper.updatedDate : newspaper.publishedDate}",
        "author": {
        "@type": "Organization",
        "name": "WePlay!"
      },
        "publisher": {
        "@type": "Organization",
        "name": "WePlay!",
        "logo": {
        "@type": "ImageObject",
        "url": "https://weplay.tv/img/logo-v2.png"
        }
      },
        "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": "${newspaper.counters?.comments ?? 0}"
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/ShareAction",
        "userInteractionCount": "${0}"
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WatchAction",
        "userInteractionCount": "${newspaper.counters?.views ?? 0}"
      }
        ]
     }
   `}
      </script>
    </IsomorphicHead>
  )
}

SeoScript.propTypes = {
  newspaper: newspaperPropType.isRequired,
  locationHref: PropTypes.string.isRequired,
}

export default React.memo(SeoScript)
