import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import styles from './Prize.scss'
import imageUrl from './img/prize.png'

const Prize = ({ size }) => (
  <figure className={classNames(
    styles.block,
    styles[size],
  )}
  >
    <img
      src={imageUrl}
      alt="prize"
      className={styles.image}
    />
  </figure>
)

Prize.propTypes = {
  size: PropTypes.string,
}

Prize.defaultProps = {
  size: '',
}

export default Prize
