import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import transliterate from 'weplay-core/helpers/translit'
import { goTo, NAMES } from 'weplay-core/routes'

import { createMemberByIdSelector } from 'weplay-competitive/reduxs/members/selectors'
import { createIsPlayerHaveBetaAccess } from 'weplay-competitive/reduxs/commonSelectors/discipline'
import { DISCIPLINES, ACCESS_TYPES } from 'weplay-competitive/config/disciplines'
import { setDefaultDiscipline } from 'weplay-competitive/reduxs/defaultDiscipline/actions'

const mapPropsToId = R.path([
  'match', 'params', 'memberId',
])
const mapPropsToTournamentDiscipline = R.path([
  'tournamentDiscipline',
])

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    member: createMemberByIdSelector(mapPropsToId),
    isPlayerHaveBetaAccess: createIsPlayerHaveBetaAccess(mapPropsToTournamentDiscipline),
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
  withPropsOnChange([
    'game',
    'discipline',
  ], ({
    tournamentDiscipline,
    discipline,
  }) => ({
    isActive: discipline && DISCIPLINES[discipline].url === tournamentDiscipline.url,
  })),

  /* eslint-disable no-shadow */
  withHandlers({
    handleClick: ({
      tournamentDiscipline,
      member,
      history,
      isDisabledForPlayer,
      setDefaultDiscipline,
    }) => () => {
      if (isDisabledForPlayer) {
        return null
      }
      if (member.id) {
        setDefaultDiscipline({
          name: tournamentDiscipline.url,
          memberId: member.id,
        })
      }
      return goTo({
        name: NAMES.MEMBER,
        history,
        params: {
          memberId: member.id,
          memberName: transliterate(member.name),
          discipline: tournamentDiscipline.url,
        },
      })
    },
  }),
)

export default container
