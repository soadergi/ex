import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import styles from './style.scss'

const mods = [
  'content',
  'fluid',
]

const Wrapper = ({
  children,
  className,
  modifiers,
}) => (
  <div className={classNames(
    styles.container,
    setCSSModifiers(modifiers, styles),
    className,
  )}
  >
    {children}
  </div>
)

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(
      mods.map(mod => mod),
    ),
  ),
}

Wrapper.defaultProps = {
  className: '',
  modifiers: [],
}

export default Wrapper
