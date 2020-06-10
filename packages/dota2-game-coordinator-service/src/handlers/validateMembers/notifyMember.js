import { lobbySide } from '../../config'
// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { sendMessageToLobby } from '../helpers'

export function notifyMember(dota2Client, correctSide, { team, name }, chatId, lobbyCreatedTime, minutesBeforeStart) {
  let message = `${name}, are you ready for battle? Join the ${correctSide} side.`

  if (lobbyCreatedTime !== 0) {
    const seconds = (minutesBeforeStart * 60 * 1000 - (Date.now() - lobbyCreatedTime)) / 1000 - 2
    const minutesLeft = Math.floor(seconds / 60)
    const secondsLeft = Math.floor(seconds % 60)

    message += ` The lobby closes in ${minutesLeft} minutes ${secondsLeft} seconds.`
  }

  // Notify member, that he/she should play on Radiant/Dire side
  if (correctSide && team === lobbySide.PLAYER_POOL) {
    setTimeout(() => {
      sendMessageToLobby(dota2Client, chatId, message)
    }, 2000)
  }
}
