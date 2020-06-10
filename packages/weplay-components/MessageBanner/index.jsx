import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import container from './container'
import styles from './styles.scss'

const modifications = ['popup']

const MessageBanner = ({
  // required props

  // props from container

  // optional props
  imageUrl,
  title,
  children,
  modifiers,
  message,
}) => (
  <div className={classNames(
    styles.block,
    setCSSModifiers(modifiers, styles),
  )}
  >
    {imageUrl && (
    <div className={styles.wrapper}>
      <img
        src={imageUrl}
        className={styles.image}
        alt={imageUrl}
      />
    </div>
    )}
    <p className={styles.title}>{title}</p>
    {message && (
      <p className={styles.message}>
        {message}
      </p>
    )}
    {children}
  </div>
)

MessageBanner.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  // props from container

  // optional props
  imageUrl: PropTypes.string,
  message: PropTypes.string,
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(modifications),
  ),
}

MessageBanner.defaultProps = {
  // optional props
  imageUrl: '',
  message: '',
  modifiers: [],
}

export default container(MessageBanner)
