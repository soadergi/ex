import PropTypes from 'prop-types'

import authorPropType from './authorPropType'

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  linkUrl: PropTypes.string,
  date: PropTypes.string,
  author: authorPropType,
  authorLink: PropTypes.string,
  url: PropTypes.string,
  published_date: PropTypes.string,
  publishedDate: PropTypes.string,
})
