import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './Hint.scss'

const Hint = ({
  children,
  label,
  // optional props
  position,
  className,
}) => (
  <div className={classNames(
    styles.block,
    styles[position],
    className,
  )}
  >
    <Icon
      iconName="info-outline"
      className={styles.icon}
      size="small"
    />
    <span className={styles.text}>{label}</span>
    <div className={styles.hint}>
      {children}
    </div>
  </div>
)

Hint.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  // optional props
  position: PropTypes.string,
  className: PropTypes.string,
}

Hint.defaultProps = {
  // optional props
  position: '',
  className: '',
}

export default React.memo(Hint)
