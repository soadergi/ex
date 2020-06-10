import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const ArticleContainer = ({
  // required props
  children,
  // container props

  // optional props
  hasAdditionalBlocks,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.grid]: hasAdditionalBlocks },
  )}
  >
    {children}
  </div>

)

ArticleContainer.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  hasAdditionalBlocks: PropTypes.bool,
}

ArticleContainer.defaultProps = {
  // optional props
  hasAdditionalBlocks: true,
}

export default container(ArticleContainer)
