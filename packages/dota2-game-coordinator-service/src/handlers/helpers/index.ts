// import { channelType } from '../../config'

export const sendMessageToLobby = (dota2Client, chatId, message) => {
  if (chatId) {
    dota2Client.sendMessage(message, chatId)
    // dota2Client.sendMessage(message, chatId, channelType.Lobby)
  }
}

export const generatePassword = (passwordLength = 4) => {
  // 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  // lodash.random(1000, 9999)
  const charset = '1234567890'
  return Array.from({ length: passwordLength })
    .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
    .join('')
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}
