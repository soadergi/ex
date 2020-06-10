export const leavePreviousLobby = dota2Client => {
  return new Promise((resolve, reject) => {
    dota2Client.destroyLobby(() => {
      dota2Client.leavePracticeLobby((err, result) => {
        if (err) {
          reject(err)
        } else if (result) {
          dota2Client.abandonCurrentGame()
          resolve(result)
        }
      })
    })
  })
}
