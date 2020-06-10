import React from 'react'
import PropTypes from 'prop-types'

import GameStats from './GameStats'

const Content = ({
  matchGameIds,
  participants,
}) => matchGameIds.map(
  id => (
    <GameStats
      key={id}
      gameId={id}
      participants={participants}
    />
  ),
)

Content.propTypes = {
  matchGameIds: PropTypes.arrayOf(
    PropTypes.string,
  ),
}

Content.defaultProps = {
  matchGameIds: [],
}

export default Content
