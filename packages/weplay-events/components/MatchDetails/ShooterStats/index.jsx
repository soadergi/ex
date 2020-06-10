import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ShooterStatsItem from './ShooterStatsItem'
import container from './container'

const ShooterStats = ({
  // required props
  matches,
  mapHighlights,

  // container props

  // optional props
  hltvStats,
}) => (
  <Fragment>
    {matches.mapsStats && matches.mapsStats.map((mapStat, index) => (
      <ShooterStatsItem
        key={mapStat.startedAt}
        mapStat={mapStat}
        mapHighlights={mapHighlights[index]}
        hltvStats={hltvStats}
      />
    ))}
  </Fragment>
)

ShooterStats.propTypes = {
  // required props
  matches: PropTypes.shape({}).isRequired,
  mapHighlights: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // container props

  // optional props
  hltvStats: PropTypes.bool,
}

ShooterStats.defaultProps = {
  // optional props
  hltvStats: false,
}

export default container(ShooterStats)
