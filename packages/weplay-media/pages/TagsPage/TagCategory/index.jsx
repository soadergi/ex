import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'
import Tag from './Tag'

const TagCategory = ({
  // required props
  title,
  tags,
  // container props
  // optional props
}) => (
  <div className={styles.block}>
    <h3 className={styles.title}>{title}</h3>
    {tags.map(tag => (
      <Tag
        key={`${tag.id}${tag.type}`}
        tag={tag}
      />
    ))}
  </div>

)

TagCategory.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // container props
  // optional props
}

TagCategory.defaultProps = {
  // optional props
}

export default container(TagCategory)
