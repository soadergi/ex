import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import logo from 'weplay-core/img/logo-v2.svg'

import points from '../img/Points.svg'

import container from './container'
import styles from './styles.scss'

const WpBanner = ({
  // required props
  // container props
  message,
  buttonText,
  link,
  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.images}>
      <img
        src={logo}
        alt="logo"
        className={styles.image}
      />
      <img
        src={points}
        alt="points"
        className={styles.image}
      />
    </div>
    <p className={styles.message}>{message}</p>

    <Link
      to={link}
      className={styles.link}
      isExternal
      target="_blank"
    >
      {buttonText}
    </Link>
  </div>

)

WpBanner.propTypes = {
  // required props
  // container props
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  // optional props
}

WpBanner.defaultProps = {
  // optional props
}

export default container(WpBanner)
