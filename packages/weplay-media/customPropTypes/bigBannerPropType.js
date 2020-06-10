import * as PropTypes from 'prop-types'

export default PropTypes.shape({
  media: PropTypes.arrayOf(PropTypes.shape({})),
  textColor: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  callToActionText: PropTypes.string,
  accessKey: PropTypes.string,
})
