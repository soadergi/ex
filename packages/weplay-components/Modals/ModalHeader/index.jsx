import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const ModalHeader = ({
  // required props
  title,
  // container props

  // optional props
  subtitle,
  className,
}) => (
  <div className={classNames(
    styles.header,
    className,
  )}
  >
    <h3 className={styles.title}>
      {title}
    </h3>

    {subtitle && (
      <p className={styles.subTitle}>
        {subtitle}
      </p>
    )}
  </div>
)

ModalHeader.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  // container props

  // optional props
  subtitle: PropTypes.string,
  className: PropTypes.string,
}

ModalHeader.defaultProps = {
  // optional props
  subtitle: '',
  className: '',
}

export default React.memo(ModalHeader)
