import countdownPropType from 'weplay-core/customPropTypes/countdownPropType'
import React from 'react'

import container from './container'

const VoteTimer = ({
  // required props

  // container props
  countdown: {
    minutes,
    seconds,
    isPassed,
  },
  // optional props
// eslint-disable-next-line no-restricted-globals
}) => (!isPassed && !isNaN(seconds)) && (
  <span>
    {`${minutes}:${seconds}`}
  </span>
)

VoteTimer.propTypes = {
  // required props

  // container props
  countdown: countdownPropType.isRequired,

  // optional props
}

VoteTimer.defaultProps = {
  // optional props
}

export default container(VoteTimer)
