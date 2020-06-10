import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { TUG_OF_WAR_STAGE_NAMES } from 'weplay-events/pages/TugOfWarPage/consts'
import { playoffRoundPropType } from 'weplay-events/customPropTypes'

import RadiantBrackets from './RadiantBrackets'
import DireBrackets from './DireBrackets'

const Brackets = ({
  // required props
  stageTitle,
  isTournamentFinished,
  playoffRounds,
  playoff2Rounds,
  playoff3Rounds,
  playoff4Rounds,
  grandFinal,
  grandFinal2,
  // container props

  // optional props
}) => (
  <Fragment>
    {stageTitle === TUG_OF_WAR_STAGE_NAMES.RADIANT && (
      <RadiantBrackets
        playoffRounds={playoffRounds}
        playoff2Rounds={playoff2Rounds}
        grandFinal={grandFinal}
        isTournamentFinished={isTournamentFinished}
      />
    )}

    {stageTitle === TUG_OF_WAR_STAGE_NAMES.DIRE && (
      <DireBrackets
        playoffRounds={playoffRounds}
        playoff2Rounds={playoff2Rounds}
        playoff3Rounds={playoff3Rounds}
        playoff4Rounds={playoff4Rounds}
        grandFinal={grandFinal}
        grandFinal2={grandFinal2}
        isTournamentFinished={isTournamentFinished}
      />
    )}
  </Fragment>
)

Brackets.propTypes = {
  // required props
  stageTitle: PropTypes.string.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,

  // container props
  playoffRounds: playoffRoundPropType.isRequired,
  playoff2Rounds: playoffRoundPropType.isRequired,
  playoff3Rounds: playoffRoundPropType.isRequired,
  playoff4Rounds: playoffRoundPropType.isRequired,
  grandFinal: playoffRoundPropType.isRequired,
  grandFinal2: playoffRoundPropType.isRequired,

  // optional props
}

Brackets.defaultProps = {
  // optional props
}

export default Brackets
