import getIsCaptain from 'weplay-events/pages/EventPage/helpers/getIsCaptain'

const initialMods = ['inverted', 'teamsList']

export default ({ player, isActive }) => {
  const extraMods = []

  if (getIsCaptain(player)) {
    extraMods.push('isCaptain')
  }

  if (isActive) {
    extraMods.push('isActive')
  }

  return initialMods.concat(extraMods)
}
