import React, { useMemo } from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'

import classes from './MediaBanner.scss'

const MediaBanner = ({ banner }) => {
  const t = useTranslation()
  const backgroundStyle = useMemo(() => ({ backgroundImage: `url(${banner.bgUrl})` }), [banner.bgUrl])

  return (
    <div
      className={classes.block}
      style={backgroundStyle}
    >
      <Image
        className={classNames(
          classes.image,
          'o-img-responsive',
        )}
        src={banner.imgUrl}
        alt={banner.title}
      />
      <div className={classes.content}>
        <h3 className={classes.title}>{t(banner.title)}</h3>
        <p className={classes.text}>
          {t(banner.text)}
        </p>
        <Link
          className={classes.button}
          to={banner.btnLink}
        >
          {t(banner.btnText)}
        </Link>
      </div>
    </div>
  )
}

export default React.memo(MediaBanner)
