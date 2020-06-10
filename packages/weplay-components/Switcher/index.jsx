import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Switcher = ({
  // required props
  value,
  onChange,
  // container props
  // optional props
  isHighlighted,
  ...restProps
}) => (
  <label
    className={classNames(
      styles.block,
      {
        [styles.isHighlighted]: isHighlighted,
      },
    )}
  >
    <input
      type="checkbox"
      className={styles.input}
      checked={value}
      onChange={onChange}
      {...restProps}
    />
    <span className={styles.circle} />
  </label>
)

Switcher.propTypes = {
  isHighlighted: PropTypes.bool,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

Switcher.defaultProps = {
  isHighlighted: false,
}

export default container(Switcher)
