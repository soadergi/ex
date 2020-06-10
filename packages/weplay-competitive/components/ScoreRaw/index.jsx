import React from 'react'
import PropTypes from 'prop-types'
import WrapperOverflowX from 'weplay-competitive/components/WrapperOverflowX'
import Score from 'weplay-competitive/components/ScoreRaw/Score'

import ScoreHeader from './ScoreHeader'
import container from './container'

const ScoreRaw = ({
  // required props
  matches,
  // props from container

  // optional props
}) => (
  <WrapperOverflowX>
    <table>
      <ScoreHeader />
      <tbody>
        {matches.map(match => (
          <Score
            key={match.id}
            match={match}
          />
        ))}
      </tbody>
    </table>
  </WrapperOverflowX>
)

ScoreRaw.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // required props

  // props from container

  // optional props

}

ScoreRaw.defaultProps = {
  // optional props
}

export default container(ScoreRaw)
