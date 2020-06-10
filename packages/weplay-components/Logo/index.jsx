import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { regular, small } from './consts'
import styles from './styles.scss'

const colors = ['', 'dark', 'white']

const Logo = ({
  // required props
  // optional props
  color,
  isSmall,
  isFluid,
}) => {
  const logo = useMemo(() => (isSmall ? small : regular), [isSmall])

  return (
    <div
      className={classNames(
        styles.block,
        styles[color],
        {
          [styles.small]: isSmall,
          [styles.fluid]: isFluid,
        },
      )}
    >
      <div className={styles.container}>
        <svg
          viewBox={logo.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <path d={logo.path} />
        </svg>
      </div>
    </div>
  )
}

Logo.propTypes = {
  // required props
  // optional props
  color: PropTypes.oneOf(colors),
  isSmall: PropTypes.bool,
  isFluid: PropTypes.bool,
}

Logo.defaultProps = {
  // optional props
  color: '',
  isSmall: false,
  isFluid: false,
}

export default React.memo(Logo)
