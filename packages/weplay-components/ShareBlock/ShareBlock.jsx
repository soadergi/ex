import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import SocialShareButton from 'weplay-components/SocialShareButton/loadable'

import styles from './ShareBlock.scss'
import { socialsByLanguage } from './config'

const ShareBlock = ({
  url,
  color,
  className,
  sharedText,
  image,
}) => {
  const { locale } = useLocale()
  const socials = useMemo(() => socialsByLanguage[locale], [locale])

  return (
    <div className={classNames(
      styles.wrapContent,
      className,
    )}
    >
      {socials.map(social => (
        <SocialShareButton
          key={social}
          color={color}
          social={social}
          url={url}
          sharedText={sharedText}
          image={image}
        />
      ))}
    </div>
  )
}

ShareBlock.propTypes = {
  url: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  sharedText: PropTypes.string,
  image: PropTypes.string,
}

ShareBlock.defaultProps = {
  url: '',
  color: 'white',
  className: '',
  sharedText: '',
  image: '',
}

export default React.memo(ShareBlock)
