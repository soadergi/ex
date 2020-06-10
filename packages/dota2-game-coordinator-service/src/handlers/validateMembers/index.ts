/* eslint-disable import/no-unresolved,import/extensions,node/no-missing-import */
import { kickNotValidMember } from './kickNotValidMember'
import { kickMemberFromWrongSide } from './kickMemberFromWrongSide'
import { notifyMember } from './notifyMember'
import { cacheManager } from '../../services/cacheManager'
import { kickRedundantMembers } from './kickRedundantMembers'
/* eslint-enable import/no-unresolved,import/extensions,node/no-missing-import */

export const validateMembers = async (
  dota2Client,
  { botSteamId, players_radiant_ids, players_dire_ids, chatId, lobbyCreatedTime, players_count, minutesBeforeStart },
  { members, lobby_id },
) => {
  const lobbyId = lobby_id.toString()
  const cacheKey = `notifiedMembers.${lobbyId}`
  const isNotifiedMembersCacheExist = await cacheManager.isCached(cacheKey)

  if (!isNotifiedMembersCacheExist) {
    await cacheManager.addCache(cacheKey, [])
  }

  const notifiedMembersCache = await cacheManager.getCache(cacheKey)

  members.forEach(member => {
    const memberSteamId = member.id.toString()
    if (memberSteamId === botSteamId) return

    const isRadiantPlayer = players_radiant_ids.includes(memberSteamId)
    const isDirePlayer = players_dire_ids.includes(memberSteamId)

    let correctSide = null

    if (isRadiantPlayer) {
      correctSide = 'Radiant'
    }
    if (isDirePlayer) {
      correctSide = 'Dire'
    }

    const isMemberNotified = notifiedMembersCache.includes(memberSteamId)

    if (!isMemberNotified) {
      notifiedMembersCache.push(memberSteamId)
      notifyMember(dota2Client, correctSide, member, chatId, lobbyCreatedTime, minutesBeforeStart)
    }

    kickMemberFromWrongSide(dota2Client, correctSide, member, chatId)
    kickNotValidMember(dota2Client, correctSide, member, chatId)
  })

  kickRedundantMembers(dota2Client, members, players_radiant_ids, players_dire_ids, players_count, chatId)
}
