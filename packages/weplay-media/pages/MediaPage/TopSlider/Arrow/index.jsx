import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'weplay-components/SvgIcon'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Arrow = ({
  // required props
  // container props
  handleClick,
  // optional props
  isLeft,
}) => (
  <div
    className={classNames(
      styles.arrow,
      {
        [styles.left]: isLeft,
      },
    )}
    onClick={handleClick}
  >
    <SvgIcon
      iconName="arrow"
      className={styles.icon}
    />
  </div>

)

Arrow.propTypes = {
  // required props
  // container props
  handleClick: PropTypes.func.isRequired,
  // optional props
  isLeft: PropTypes.bool,
}

Arrow.defaultProps = {
  // optional props
  isLeft: false,
}

export default container(Arrow)
