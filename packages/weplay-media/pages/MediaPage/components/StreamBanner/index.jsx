import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button, { BUTTON_COLOR, BUTTON_SIZE } from 'weplay-components/Button'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const StreamBanner = ({
  text,
  isLive,
  i18nTexts,
  handleClick,
  bannerBackground,
  bannerEventLeft,
  bannerEventRight,
  buttonText,
  textColor,
  bannerTextSecondOpt,
  buttonTextSecondOpt,
}) => (
  <div
    className={classNames(
      styles.banner,
    )}
    style={bannerBackground}
  >
    {bannerEventLeft && (
      <Image
        src={bannerEventLeft}
        alt=""
        className={classNames(styles.image, styles.leftImage)}
      />
    )}
    {bannerEventRight && (
      <Image
        src={bannerEventRight}
        alt=""
        className={classNames(styles.image, styles.rightImage)}
      />
    )}
    <div className={styles.content}>
      <div className={styles.container}>
        <span
          className={classNames(
            styles.label,
            { [styles.isLive]: isLive },
          )}
        >
          {isLive ? i18nTexts.streamBanner.live : i18nTexts.streamBanner.soon}
        </span>
        <div className={styles.wrapper}>
          <p className={styles.text}>
            <span
              className="u-text-medium"
              style={textColor}
            >
              {isLive ? bannerTextSecondOpt : text}
            </span>
          </p>
          <Button
            onClick={handleClick}
            className={styles.button}
            color={BUTTON_COLOR.CTA}
            size={BUTTON_SIZE.SM}
          >
            {isLive ? buttonTextSecondOpt : buttonText}
          </Button>
        </div>
      </div>
    </div>
  </div>
)

StreamBanner.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
  isLive: PropTypes.bool.isRequired,
  textColor: PropTypes.shape({}).isRequired,
  bannerBackground: PropTypes.shape({}).isRequired,
  bannerEventLeft: PropTypes.string.isRequired,
  bannerEventRight: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  bannerTextSecondOpt: PropTypes.string.isRequired,
  buttonTextSecondOpt: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default container(StreamBanner)
