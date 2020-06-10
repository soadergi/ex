import React from 'react'
import PropTypes from 'prop-types'
import MatchResultPropType from 'weplay-competitive/customPropTypes/matchResultPropType'
import container from 'weplay-competitive/pages/MatchPage/Information/Overview/container'
import MatchInfo from 'weplay-competitive/pages/MatchPage/Information/Overview/MatchInfo'

const Overview = ({
  // required props
  discipline,

  // container props
  matchResults,
  // optional props
}) => matchResults.map((matchResult, index) => (
  <MatchInfo
    key={matchResult.id} // eslint-disable-line react/no-array-index-key
    record={matchResult}
    index={index}
    discipline={discipline}
  />
))

Overview.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  // container props
  matchResults: PropTypes.arrayOf(MatchResultPropType).isRequired,
  // optional props
}

Overview.defaultProps = {
  // optional props
}

export default container(Overview)
