import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

export const ArticleItemWrapMarkup = ({
  // required props
  children,

  // container props

  // optional props
  className,
  innerRef,
}) => (
  <div
    ref={innerRef}
    className={classNames(
      className,
      styles.wrap,
    )}
  >
    {children}
  </div>

)

ArticleItemWrapMarkup.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
  innerRef: PropTypes.func,
}

ArticleItemWrapMarkup.defaultProps = {
  // optional props
  className: '',
  innerRef: () => {},
}

export default container(ArticleItemWrapMarkup)
