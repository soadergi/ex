import { lobbySide } from '../../config'

export const joinPlayerPoolTeam = dota2Client => {
  return new Promise((resolve, reject) => {
    dota2Client.joinPracticeLobbyTeam(0, lobbySide.PLAYER_POOL, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
