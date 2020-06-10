import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const BannerHeader = ({
  title,
  description,

  isTextAlignRight,
}) => (
  <div
    className={classNames(
      styles.dataBlock,
      { [styles.isTextAlignRight]: isTextAlignRight },
    )}
  >
    <p className={styles.description}>{description}</p>
    <p className={styles.title}>{title}</p>
  </div>
)

BannerHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  isTextAlignRight: PropTypes.bool,
}

BannerHeader.defaultProps = {
  isTextAlignRight: false,
}

export default container(BannerHeader)
