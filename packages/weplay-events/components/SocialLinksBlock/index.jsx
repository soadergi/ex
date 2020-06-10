import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import container from './container'
import styles from './styles.scss'

const SocialLinksBlock = ({
  // required props

  // container props

  // optional props
  title,
  children,
  modifiers,
}) => (
  <div
    className={classNames(
      styles.block,
      setCSSModifiers(modifiers, styles),
    )}
  >
    <div className={styles.container}>
      <h2 className={styles.title}>
        {title}
      </h2>

      {children}
    </div>
  </div>
)

SocialLinksBlock.propTypes = {
  // required props

  // container props

  // optional props
  children: PropTypes.node,
  title: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
}

SocialLinksBlock.defaultProps = {
  // optional props
  children: null,
  title: '',
  modifiers: [],
}

export default container(SocialLinksBlock)
