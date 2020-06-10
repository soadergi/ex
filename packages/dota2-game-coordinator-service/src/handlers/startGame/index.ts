// eslint-disable-next-line import/extensions,import/no-unresolved,node/no-missing-import
import { sendMessageToLobby } from '../helpers'

export const startGame = ({ dota2Client, secondsBeforeStart, chatId, clearLobby5SecondTimer }) => {
  let secondsLeft = secondsBeforeStart
  let countdownMessage = `The game starts in ${secondsLeft} seconds.`
  const countdownFinishedMessage = 'GL HF!!!'
  sendMessageToLobby(dota2Client, chatId, countdownMessage)
  secondsLeft--

  const startupTimerEvery1SecondId = setInterval(async () => {
    if (secondsLeft <= 0) {
      clearInterval(startupTimerEvery1SecondId)
      // TODO: this is probably async???
      sendMessageToLobby(dota2Client, chatId, countdownFinishedMessage)
      dota2Client.launchPracticeLobby()
      await clearLobby5SecondTimer()
    } else {
      countdownMessage = `The game starts in ${secondsLeft} seconds.`
      sendMessageToLobby(dota2Client, chatId, countdownMessage)
    }
    secondsLeft--
  }, 1000)

  return startupTimerEvery1SecondId
}
