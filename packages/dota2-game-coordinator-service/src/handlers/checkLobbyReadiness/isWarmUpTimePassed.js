export const isWarmUpTimePassed = (lobbyCreatedTime, minutesBeforeStart) => {
  return !!lobbyCreatedTime && lobbyCreatedTime <= Date.now() - minutesBeforeStart * 60 * 1000
}
