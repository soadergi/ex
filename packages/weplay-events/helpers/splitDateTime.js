function splitDateTime(dateTime = '') {
  // dateTime "2020-02-23T16:00:00Z"
  const [date, time] = dateTime.split('T')
  return { date, time }
}

export default splitDateTime
