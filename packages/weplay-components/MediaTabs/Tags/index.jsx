import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'

const Tags = ({
  // required props
  tags,
  // optional props
}) => (
  <ul>
    {tags.map(tag => (
      <li key={tag.text}>
        <Link to={tag.link}>
          {tag.text}
        </Link>
      </li>
    ))}
  </ul>
)

Tags.propTypes = {
  // required props
  tags: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  // optional props
}

Tags.defaultProps = {
  // optional props
}

export default Tags
