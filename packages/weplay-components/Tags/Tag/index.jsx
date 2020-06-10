import React from 'react'
import PropTypes from 'prop-types'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Link from 'weplay-components/Link'
import classNames from 'classnames'
import Skeleton from 'weplay-components/Skeleton'

import container from './container'
import styles from './styles.scss'

const Tag = ({
  name,
  url,
  handleClick,
  isSpecialTag,
}) => (
  <li
    className={classNames(
      styles.block,
      { [styles.specialTag]: isSpecialTag },
    )}
  >
    <Link
      to={url}
      className={styles.link}
      onClick={handleClick}
      {...getAnalyticsAttributes({
        action: 'Tag',
        label: name,
      })}
    >
      { name || <Skeleton size="short" /> }
    </Link>
  </li>
)

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSpecialTag: PropTypes.bool.isRequired,
}

export default container(Tag)
