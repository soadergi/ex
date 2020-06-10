import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const getPlayerRole = (player, isCaptainWithRole, captainRoleLabel) => {
  if (!player.isCaptain) {
    return player.role
  }
  if (isCaptainWithRole) {
    return `${captainRoleLabel}, ${player.role}`
  }
  return captainRoleLabel
}

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withProps(({
    // TODO: Array of heroes list format. @JS - needs implementation
    // heroesPreviewsList: [
    //   {
    //     name: 'tiny',
    //     url: 'https://via.placeholder.com/24x30',
    //   },
    //   {
    //     name: 'phantom',
    //     url: 'https://via.placeholder.com/24x30',
    //   },
    //   {
    //     name: 'tidehunter',
    //     url: 'https://via.placeholder.com/24x30',
    //   },
    // ],
  })),

  withPropsOnChange([
    'player',
    'isCaptainWithRole',
    't',
  ], ({
    player,
    isCaptainWithRole,
    t,
  }) => ({
    playerSocials: R.pipe(
      R.propOr([], 'social'),
      R.filter(
        R.pipe(
          R.isEmpty,
          R.not,
        ),
      ),
      R.pick(['facebook', 'twitch', 'twitter']),
      socials => Object.keys(socials).map(key => ({
        icon: key,
        path: socials[key],
        analyticEventLabel: key,
      })),
    )(player),
    playerRole: getPlayerRole(player, isCaptainWithRole, t('tournamentStages.invitedTeams.captain')),
  })),
)

export default container
