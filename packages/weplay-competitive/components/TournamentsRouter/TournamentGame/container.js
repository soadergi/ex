import {
  compose,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { createIsPlayerHaveBetaAccess } from 'weplay-competitive/reduxs/commonSelectors/discipline'
import { ACCESS_TYPES } from 'weplay-competitive/config/disciplines'
import { setDefaultDiscipline } from 'weplay-competitive/reduxs/defaultDiscipline/actions'

const mapPropsToTournamentDiscipline = R.path([
  'tournamentDiscipline',
])

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isPlayerHaveBetaAccess: createIsPlayerHaveBetaAccess(mapPropsToTournamentDiscipline),
    currentMemberId: userIdSelector,
  }), {
    // actionCreators
    setDefaultDiscipline,
  }),
  withPropsOnChange([
    'tournamentDiscipline',
    'isPlayerHaveBetaAccess',
  ], ({
    tournamentDiscipline,
    isPlayerHaveBetaAccess,
  }) => ({
    isDisabledForPlayer: tournamentDiscipline.access.type === ACCESS_TYPES.DISABLED
      || (tournamentDiscipline.access.type === ACCESS_TYPES.BETA && !isPlayerHaveBetaAccess),
  })),

  /* eslint-disable no-shadow */
  withHandlers({
    handleLinkClick: ({
      tournamentDiscipline,
      setDefaultDiscipline,
      currentMemberId,
    }) => () => {
      if (currentMemberId && (tournamentDiscipline.isShowInGameProfile)) {
        setDefaultDiscipline({
          name: tournamentDiscipline.url,
          memberId: currentMemberId,
        })
      }
    },
  }),
)

export default container
