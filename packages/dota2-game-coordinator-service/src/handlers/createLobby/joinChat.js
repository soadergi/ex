import { channelType } from '../../config'

export const joinChat = (dota2Client, chatId) => {
  return new Promise(resolve => {
    dota2Client.once('chatJoined', resolve)
    dota2Client.joinChat(chatId, channelType.Lobby)
  })
}
