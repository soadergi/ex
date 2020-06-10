export const getMinutesPassedCounter = startTime => {
  const endTime = Date.now()
  const seconds = (endTime - startTime) / 1000

  return Math.floor(seconds / 60)
}

export const getSecondsPassedCounter = startTime => {
  const endTime = Date.now()
  const seconds = (endTime - startTime) / 1000

  return Math.ceil(seconds % 60)
}
