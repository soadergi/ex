import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const Tag = ({
  // required props
  // container props
  name,
  url,
  isSpecial,
  isNoFollow,
  // optional props
}) => (
  <div className={styles.block}>
    <Link
      className={classNames(
        styles.link,
        { [styles.special]: isSpecial },
      )}
      to={url}
      {... isNoFollow && { rel: 'noindex nofollow' }}
    >
      {name}
    </Link>
  </div>
)

Tag.propTypes = {
  // required props
  // container props
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isSpecial: PropTypes.bool.isRequired,
  isNoFollow: PropTypes.bool.isRequired,
  // optional props
}

Tag.defaultProps = {
  // optional props
}

export default container(Tag)
