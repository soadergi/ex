import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import authorPropType from 'weplay-core/customPropTypes/authorPropType'

import UserAvatar from 'weplay-components/UserAvatar'
import SocialIcons from 'weplay-components/SocialIcons'

import styles from './AuthorCard.scss'

const userAvatarResponsive = {
  sm: '128',
}

const AuthorCard = ({
  author,
  isColumnist,
}) => {
  const t = useTranslation()

  const authorName = `${author.firstName} ${author.lastName}`
  const authorLabel = isColumnist ? t('mediaCore.columnistCard.label') : t('mediaCore.authorCard.label')

  const socialLinks = author.socialNetworks.map(socialNetwork => ({
    // TODO: @Andrew, @HTML, add 'telegram' icon and use it everywhere
    type: socialNetwork.type === 'TELEGRAM' ? 'telegramMedia' : socialNetwork.type.toLowerCase(),
    url: socialNetwork.link,
  }))

  return (
    <div className={classNames(
      styles.block,
      {
        [styles.author]: !isColumnist,
      },
    )}
    >
      <div className={styles.info}>
        <UserAvatar
          avatar={author.avatar?.path}
          className={styles.avatar}
          size="96"
          responsive={userAvatarResponsive}
        />
        <div className={styles.wrapper}>
          <h1 className={styles.nick}>{author.nickName}</h1>
          <p className={styles.name}>{authorName}</p>
          <div className={styles.socialWrapper}>
            <span className={styles.label}>
              {authorLabel}
            </span>
            <SocialIcons
              links={socialLinks}
              className={styles.socials}
            />
          </div>
        </div>
      </div>
      <div className={styles.text}>
        <p>{author.shortDescription}</p>
      </div>
    </div>
  )
}

AuthorCard.propTypes = {
  author: authorPropType.isRequired,
  isColumnist: PropTypes.bool.isRequired,
}

AuthorCard.defaultProps = {
  // optional props
}

export default React.memo(AuthorCard)
