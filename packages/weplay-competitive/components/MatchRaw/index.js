import React from 'react'
import PropTypes from 'prop-types'

import Match from 'weplay-competitive/components/MatchRaw/Match'
import MatchHeader from 'weplay-competitive/components/MatchRaw/MatchHeader'
import matchTableItemPropType from 'weplay-competitive/customPropTypes/matchTableItemPropType'

const MatchRaw = ({
  // required props
  matches,
  discipline,
  // props from container

  // optional props

}) => (
  <table>
    <MatchHeader
      discipline={discipline}
    />
    <tbody>
      {matches.map(matchItem => (
        <Match
          key={matchItem.id}
          matchItem={matchItem}
        />
      ))}
    </tbody>
  </table>
)

MatchRaw.propTypes = {
  // required props
  matches: PropTypes.arrayOf(matchTableItemPropType).isRequired,
  discipline: PropTypes.string.isRequired,
  // props from container

  // optional props

}

MatchRaw.defaultProps = {
  // optional props
}

export default React.memo(MatchRaw)
