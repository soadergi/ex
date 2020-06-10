import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import styles from './Separator.scss'

const mods = ['dark']

const Separator = ({
  modifiers,
  size,
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
    setCSSModifiers(modifiers, styles),
    styles[size],
  )}
  />
)

Separator.propTypes = {
  // required props
  size: PropTypes.string.isRequired,
  // optional props
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  className: PropTypes.string,
  // container props
}

Separator.defaultProps = {
  // optional props
  modifiers: [],
  className: '',
}

export default React.memo(Separator)
