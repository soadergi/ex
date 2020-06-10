export const createLobby = (dota2Client, { lobbyConfig }) => {
  return new Promise((resolve, reject) => {
    dota2Client.createPracticeLobby(lobbyConfig, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
