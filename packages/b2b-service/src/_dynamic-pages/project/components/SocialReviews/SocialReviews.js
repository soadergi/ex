import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Headline from 'weplay-components/HeadLine'

import SocialReview from './SocialReview/SocialReview'
import classes from './SocialReviews.scss'

const SocialReviews = ({
  socialReviews,
}) => {
  const t = useTranslation()
  return (
    <>
      <Headline
        className="u-text-center"
        title={t('projectPage.common.socialReviews.title')}
      />
      <div className={classes.block}>
        {socialReviews.map(socialReview => !socialReview.title.includes('.socialReviews.') && (
          <SocialReview
            socialReview={socialReview}
            key={socialReview.title}
          />
        ))}
      </div>
    </>
  )
}

export default React.memo(SocialReviews)
