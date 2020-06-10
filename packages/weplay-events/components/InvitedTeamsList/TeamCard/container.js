import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMediumWidthLegacySelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { TBD_TEAM } from 'weplay-events/constants/tbdTeam'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMediumWidth: isMediumWidthLegacySelector,
  }), {
    // actionCreators
  }),

  withStateHandlers(({ isInitiallyExpanded }) => ({
    isExpanded: isInitiallyExpanded,
  }), {
    toggleExpanded: ({
      isExpanded,
    }) => () => ({
      isExpanded: !isExpanded,
    }),
  }),

  withPropsOnChange([
    'isMediumWidth',
    'isExpanded',
    'team',
  ], ({
    isMediumWidth,
    isExpanded,
    team,
  }) => ({
    isTeamCardToggleVisible: !team.isTbd && (!isExpanded || isMediumWidth),
    isTeamCardToggleVisibleInParticipant: !team.isTbd && (!isMediumWidth && isExpanded),
    sortedTeamPlayers: R.pipe(
      R.prop('players'),
      R.sortWith([R.descend(R.propEq('isCaptain', true))]),
    )(team),
  })),

  withPropsOnChange([
    'team',
  ], ({
    team,
  }) => {
    if (team.isTbd) {
      return {
        team: {
          ...team,
          nickname: TBD_TEAM.name,
          picture: '',
        },
        sortedTeamPlayers: [...TBD_TEAM.players],
      }
    }

    return team
  }),
)

export default container
