import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tag from './Tag'
import container from './container'
import styles from './styles.scss'

const Tags = ({
  tagsToShow,
  className,
}) => (
  <ul className={classNames(
    styles.tags,
    className,
  )}
  >
    {tagsToShow.map(tag => (
      <Tag
        tag={tag}
        key={tag.name}
      />
    ))}
  </ul>
)

Tags.propTypes = {
  tagsToShow: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
}

Tags.defaultProps = {
  // optional props
  className: '',
}

export default container(Tags)
