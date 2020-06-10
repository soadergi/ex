import PropTypes from 'prop-types'

export default PropTypes.arrayOf(PropTypes.shape({
  articleId: PropTypes.number.isRequired,
  newsId: PropTypes.number.isRequired,
  columnist: PropTypes.object,
  author: PropTypes.object,
  body: PropTypes.string,
  publishedDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}))
