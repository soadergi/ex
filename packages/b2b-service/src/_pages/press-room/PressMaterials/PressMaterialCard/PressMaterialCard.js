import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'

import classes from './PressMaterialCard.scss'

const PressMaterialCard = ({
  material: {
    imageUrl,
    projectLink,
    title,
    pressKitUrl,
    photoUrl,
    logosUrl,
  },
}) => {
  const t = useTranslation()
  return (
    <div className={classes.block}>
      <Link
        to={projectLink}
        isExternal
        className={classes.imageLink}
      >
        <Image
          className={classes.image}
          src={imageUrl}
          alt={title}
        />
      </Link>

      <div className={classes.buttons}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.links}>
          <Link
            to={pressKitUrl}
            className={classes.link}
          >
            <Icon
              iconName="presskit"
              className="u-mb-1"
            />
            {t('pressRoomPage.pressMaterialCard.pressKit')}
          </Link>

          <Link
            to={photoUrl}
            className={classes.link}
          >
            <Icon
              iconName="image"
              className="u-mb-1"
            />
            {t('pressRoomPage.pressMaterialCard.photos')}
          </Link>

          <Link
            to={logosUrl}
            className={classes.link}
          >
            <Icon
              iconName="flower"
              className="u-mb-1"
            />
            {t('pressRoomPage.pressMaterialCard.logos')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PressMaterialCard)
