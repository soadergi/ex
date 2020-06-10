import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const PageSectionTitle = ({
  // required props
  text,
  // container props

  // optional props
  iconName,
  className,
}) => (
  <p className={styles.block}>
    {iconName && (
    <Icon
      iconName={iconName}
      className={styles.icon}
    />
    )}
    <span className={
      classNames(
        styles.text,
        className,
      )
    }
    >
      {text}
    </span>
  </p>
)

PageSectionTitle.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  // container props

  // optional props
  iconName: PropTypes.string,
  className: PropTypes.string,
}

PageSectionTitle.defaultProps = {
  // optional props
  iconName: '',
  className: '',
}

export default container(PageSectionTitle)
