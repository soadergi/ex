import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GradientLink from 'weplay-components/GradientLink'

import container from './container'
import styles from './styles.scss'

const Headline = ({
  // required props
  title,
  // container props

  // optional props
  linkUrl,
  linkText,
  text,
  size,
  className,
}) => (
  <div
    className={classNames(
      styles.block,
      className,
    )}
  >
    {linkUrl && (
      <GradientLink
        to={linkUrl}
        text={linkText}
      />
    )}
    <h2 className={classNames(
      styles.title,
      styles[size],
    )}
    >
      {title}
    </h2>
    {text && (
    <p className={styles.text}>{text}</p>
    )}
  </div>

)

Headline.propTypes = {
  // required props
  // container props

  // optional props
  title: PropTypes.string,
  text: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
}

Headline.defaultProps = {
  // optional props
  title: '',
  text: '',
  linkUrl: '',
  linkText: '',
  size: '',
  className: '',
}

export default container(Headline)
