import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './ImageGallery.scss'

const Arrow = ({
  // required props
  onClick,
  // optional props
  isLeft,
}) => (
  <div
    className={classNames(
      styles.arrow,
      { [styles.left]: isLeft },
    )}
    onClick={onClick}
  >
    <Icon
      iconName="arrow-right"
      className={styles.icon}
    />
  </div>
)

Arrow.propTypes = {
  // required props
  onClick: PropTypes.func.isRequired,
  // optional props
  isLeft: PropTypes.bool,
}

Arrow.defaultProps = {
  // optional props
  isLeft: false,
}

export default React.memo(Arrow)
