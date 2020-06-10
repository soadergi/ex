import * as R from 'ramda'

import getIsCaptain from 'weplay-events/pages/EventPage/helpers/getIsCaptain'

export default ({ player }) => {
  const playerSocials = player
    |> R.propOr({}, 'socialNetworks')
    |> R.pick(['facebook', 'twitch', 'twitter'])
    |> (socials => Object.keys(socials).map(key => ({
      icon: key,
      path: socials[key],
    })))

  return {
    playerSocials,
    isCaptain: getIsCaptain(player),
  }
}
