import { lobbySide } from '../../config/index'

export const checkMemberHeroIds = async members => {
  return members
    .filter(member => member.team === lobbySide.RADIANT || member.team === lobbySide.DIRE)
    .every(member => member.hero_id !== null)
}
