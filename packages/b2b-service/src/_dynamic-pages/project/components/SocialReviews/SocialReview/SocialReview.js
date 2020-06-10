import React from 'react'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import classes from './SocialReview.scss'

const SocialReviews = ({
  socialReview,
}) => (
  <div className={classes.block}>
    <Icon
      iconName={socialReview.socialIcon}
      size="large"
      className={classNames(
        classes[socialReview.socialIcon],
        { [classes.icon]: socialReview.socialIcon === 'news' },
      )}
    />
    <p className={classes.title}>
      {socialReview.title}
    </p>
    <p className={classes.text}>
      {socialReview.text}
    </p>
    <a
      className={classes.text}
      href={socialReview.nicknameUrl}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {socialReview.nickname}
    </a>
  </div>
)

export default React.memo(SocialReviews)
