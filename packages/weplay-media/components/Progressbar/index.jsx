import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Progressbar = ({
  scrollPercent,
  isScrolledTop,
}) => (
  <div className={classNames(
    styles.progressbar,
    { [styles.progressbarOpen]: isScrolledTop },
  )}
  >
    <div
      className={styles.progressbarBody}
      style={{ width: `${scrollPercent}%` }}
    />
  </div>
)

Progressbar.propTypes = {
  scrollPercent: PropTypes.number.isRequired,
  isScrolledTop: PropTypes.bool.isRequired,
}

export default container(Progressbar)
