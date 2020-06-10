import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

export const MessageBlockMarkup = ({
  // required props
  text,
  image,
  // container props

  // optional props
  className,
}) => (
  <div className={classNames(
    styles['c-alert-block'],
    className,
  )}
  >
    <div className={classNames(
      styles['c-alert'],
      styles['c-alert--gray'],
    )}
    >
      <div className={styles['c-alert__container']}>
        <div className={styles['c-alert__icon-block']}>
          {image}
        </div>
        <p className={styles['c-alert__text']}>
          {text(styles['c-alert__link'])}
        </p>
      </div>
    </div>
  </div>
)

MessageBlockMarkup.propTypes = {
  // required props
  text: PropTypes.func.isRequired,
  image: PropTypes.func.isRequired,

  // container props

  // optional props
  className: PropTypes.string,
}

MessageBlockMarkup.defaultProps = {
  // optional props
  className: '',
}

export default container(MessageBlockMarkup)
