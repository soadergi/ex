import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const ModalHeader = ({
  // required props
  children,
  titleText,
  // container props

  // optional props
  className,
}) => (

  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <p className={styles.title}>
      {titleText}
      {children}
    </p>
  </div>
)

ModalHeader.propTypes = {
  // required props
  titleText: PropTypes.string.isRequired,
  // container props

  // optional props
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalHeader.defaultProps = {
  // optional props
  className: '',
  children: null,
}

export default container(ModalHeader)
