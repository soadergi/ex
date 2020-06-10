import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import BackgroundImg from 'weplay-components/BackgroundImg'
import Logo from 'weplay-components/Logo'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import Image from 'weplay-components/Image'

import styles from './styles.scss'

const TournamentsBanner = ({
  title,
  buttonUrl,
  background,
  isLogo,
  extraImage,
  btnText,
  isWide,
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
    { [styles.wide]: isWide },
  )}
  >
    <BackgroundImg
      src={background}
      alt="banner background"
      className={styles.bannerBg}
    />

    {isWide && (
      <span className={styles.tabletGrad} />
    )}

    <div className={styles.content}>
      {isLogo && (
      <div className={styles.logoBlock}>
        <Logo />
      </div>
      )}

      {extraImage && (
      <Image
        className={classNames(
          'o-img-responsive',
          styles.image,
        )}
        src={extraImage}
        alt=""
      />
      )}

      {title && (
      <p className={styles.title}>
        {title}
      </p>
      )}
      <Button
        href={buttonUrl}
        color={BUTTON_COLOR.CTA}
        className={styles.button}
      >
        {btnText}
      </Button>
    </div>
  </div>
)

TournamentsBanner.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  buttonUrl: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  // container props
  // optional props
  isLogo: PropTypes.bool,
  isWide: PropTypes.bool,
  extraImage: PropTypes.string,
  className: PropTypes.string,
}

TournamentsBanner.defaultProps = {
  isLogo: true,
  isWide: false,
  extraImage: '',
  className: '',
}

export default React.memo(TournamentsBanner)
