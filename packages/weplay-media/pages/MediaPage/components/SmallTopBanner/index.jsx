import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const SmallTopBanner = ({
  text,
  textColor,
  buttonText,
  bannerBackground,
  isLite,
  handleClick,
}) => (
  <div
    className={classNames(
      styles.banner,
      {
        [styles.isLite]: isLite,
      },
    )}
    style={bannerBackground}
  >
    <div
      className={styles.content}
    >
      <div
        className={styles.container}
      >
        <p
          style={textColor}
          className={styles.text}
        >
          {text}
        </p>

        <button
          onClick={handleClick}
          type="button"
          className={styles.button}
        >
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  </div>
)

SmallTopBanner.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.shape({}).isRequired,
  buttonText: PropTypes.string.isRequired,
  bannerBackground: PropTypes.shape({}).isRequired,
  isLite: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

SmallTopBanner.defaultProps = {
  // optional props
  isLite: false,
}

export default container(SmallTopBanner)
