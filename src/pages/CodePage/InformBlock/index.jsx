import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const InformBlock = ({
  // required props
  subTitle,
  title,
  description,
  children,
  // container props

  // optional props
}) => (
  <div
    className={classNames(
      styles.informBlock,
    )}
  >
    <div className={styles.block}>
      <p className={styles.subtitle}>{subTitle}</p>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  </div>

)

InformBlock.propTypes = {
  // required props
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // optional props
  children: PropTypes.node,
  // container props

}

InformBlock.defaultProps = {
  // optional props
  children: null,
}

export default container(InformBlock)
