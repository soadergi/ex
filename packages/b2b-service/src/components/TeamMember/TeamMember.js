import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import classes from './TeamMember.scss'

const TeamMember = ({
  // required props
  member,

  // optional props
  cardSize,
  isSeeMoreButtonVisible,
}) => {
  const t = useTranslation()

  return (
    <div
      className={classNames(
        classes.block,
        classes[cardSize],
      )}
    >
      <figure className={classes.imageWrapper}>
        <Image
          className={classNames(
            classes.image,
          )}
          src={t(member.portraitPhotoKey)}
          alt={t(member.nameKey)}
        />
      </figure>

      <p className={classes.title}>
        {t(member.nameKey)}
      </p>

      <p className={classes.text}>
        {t(member.positionKey)}
      </p>

      {isSeeMoreButtonVisible && (
        <Link
          to={`/team/${member.slug}`}
          className={classes.link}
        >
          {t('teamPage.button.text')}
          <Icon
            className="u-ml-1"
            iconName="arrow-link"
          />
        </Link>
      )}
    </div>
  )
}
export default TeamMember
