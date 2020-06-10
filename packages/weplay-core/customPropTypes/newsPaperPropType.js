import PropTypes from 'prop-types'

export default PropTypes.shape({
  columnist: PropTypes.object,
  author: PropTypes.object,
  body: PropTypes.string,
  articleId: PropTypes.number,
  publishedDate: PropTypes.string,
  title: PropTypes.string,
  timeToRead: PropTypes.number,
  mediaCopyright: PropTypes.string,
})
