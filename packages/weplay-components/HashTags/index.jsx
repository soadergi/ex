import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import tagPropType from 'weplay-core/customPropTypes/tagPropType'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const HashTags = ({
  // required props
  tags,
  // container props
  // optional props
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    {tags.map(tag => (
      <Link
        key={tag.name}
        to={tag.url}
        className={styles.hashTag}
        {...getAnalyticsAttributes({
          action: 'Tag',
          label: tag.name,
        })}
      >
        {tag.name}
      </Link>
    ))}
  </div>
)

HashTags.propTypes = {
  // required props
  tags: PropTypes.arrayOf(tagPropType).isRequired,
  // container props
  // optional props
  className: PropTypes.string,
}

HashTags.defaultProps = {
  // optional props
  className: '',
}

export default container(HashTags)
