import React from 'react'
import PropTypes from 'prop-types'
import matchDetailsParticipant from 'weplay-events/customPropTypes/matchDetailsParticipant'

import MobaStatsItem from './MobaStatsItem'
import container from './container'

const MobaStats = ({
  // required props
  openDotaMatchIds,
  mapHighlights,
  participantA,

  // container props
  logSocialClick,

  // optional props
  dotabuffStats,
}) => openDotaMatchIds.map((matchId, index) => (
  <MobaStatsItem
    key={matchId}
    matchId={matchId}
    mapHighlights={mapHighlights[index]}
    logSocialClick={logSocialClick}
    participantA={participantA}
    dotabuffStats={dotabuffStats}
  />
))

MobaStats.propTypes = {
  // required props
  mapHighlights: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openDotaMatchIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  logSocialClick: PropTypes.func.isRequired,
  participantA: matchDetailsParticipant.isRequired,

  // container props

  // optional props
  dotabuffStats: PropTypes.bool,
}

MobaStats.defaultProps = {
  // optional props
  dotabuffStats: false,
}

export default container(MobaStats)
