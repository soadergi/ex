import PropTypes from 'prop-types'

export const currentStagePropType = PropTypes.shape({
  id: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
})

export const stagesPropType = PropTypes.arrayOf(
  currentStagePropType,
)
