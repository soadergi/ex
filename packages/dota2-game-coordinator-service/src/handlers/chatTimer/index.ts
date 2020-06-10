// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { sendMessageToLobby } from '../helpers'

export const sendRemainingTimeNotification = (dota2Client, gameConfig) => {
  let minutesLeft = gameConfig.minutesBeforeStart
  let secondsLeft = 45
  const iterationIntervalSeconds = 15
  const iterationIntervalMinutes = 1
  let messageEvery1Minute = `The lobby closes in ${minutesLeft} minutes.`

  sendMessageToLobby(dota2Client, gameConfig.chatId, messageEvery1Minute)

  minutesLeft--

  // eslint-disable-next-line no-param-reassign
  gameConfig.lobbyCountdownTimerId = setInterval(() => {
    messageEvery1Minute = `The lobby closes in ${minutesLeft} minutes.`
    sendMessageToLobby(dota2Client, gameConfig.chatId, messageEvery1Minute)

    if (minutesLeft <= 1) {
      clearInterval(gameConfig.lobbyCountdownTimerId)
      // eslint-disable-next-line consistent-return,no-param-reassign
      gameConfig.lobbyCountdownTimerId = setInterval(() => {
        if (secondsLeft <= 0) return clearInterval(gameConfig.lobbyCountdownTimerId)

        const messageEvery15Seconds = `The lobby closes in ${secondsLeft} seconds.`
        sendMessageToLobby(dota2Client, gameConfig.chatId, messageEvery15Seconds)

        secondsLeft -= iterationIntervalSeconds
      }, iterationIntervalSeconds * 1000)
    }

    minutesLeft--
  }, iterationIntervalMinutes * 60 * 1000)
}
