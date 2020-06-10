import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import classes from './MemberPage.scss'

const MemberPage = ({ member, children }) => {
  const t = useTranslation()
  return (
    <div className={classes.block}>
      <picture className={classes.imageWrap}>
        <source
          media="(max-width: 1279px)"
          srcSet={t(member.landscapePhotoKey)}
        />
        <source
          media="(min-width: 1280px)"
          srcSet={t(member.portraitPhotoKey)}
        />
        <img
          src={t(member.landscapePhotoKey)}
          alt={t(member.nameKey)}
          className={classes.image}
        />
      </picture>
      <div className={classes.teamSlideText}>
        {children}
        <Scrollbars
          autoHeight
          universal
          autoHeightMax={453}
        >
          <div className={classes.textWrap}>
            <h2 className={classes.memberTitle}>{t(member.nameKey)}</h2>
            <p className={classes.memberPosition}>{t(member.positionKey)}</p>
            <p className={classes.memberText}>{t(member.descriptionKey)}</p>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}
export default MemberPage
